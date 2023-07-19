import multer from "multer";
import ErrorHandler from "./errorHandler";
import * as dateFn from "date-fns";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import mime from "mime";
import { uploadImage } from "./cloudinary";

const uploderInPublic = async (file: Blob, path_storeg: string) => {
  const buffer = Buffer.from(await file.arrayBuffer());

  const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;

  let tempraryImageDirectory: string;
  if (process.env.DEV && process.env.DEV === "Yes") {
    tempraryImageDirectory = join(process.cwd(), "public", relativeUploadDir);
  } else {
    tempraryImageDirectory = "/tmp/";
  }
  try {
    await stat(tempraryImageDirectory);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(tempraryImageDirectory, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return new ErrorHandler("Something went wrong.", 500);
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${file.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
    const url = await writeFile(
      `${tempraryImageDirectory}/${filename}`,
      buffer
    );
    console.log(url, "++++++++++++++++++++++++++++++++++++++++++++");

    const uploader = async (path: string) =>
      await uploadImage(path, path_storeg);

    const avatarResponse = await uploader(
      `${tempraryImageDirectory}/${filename}`
    );
    return { ...avatarResponse };
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return new ErrorHandler("Something went wrong.", 500);
  }
};

export default uploderInPublic;
