import multer from "multer";
import ErrorHandler from "./errorHandler";
import * as dateFn from "date-fns";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import mime from "mime";
import { uploadImage } from "./cloudinary";

const uploderInPublic = async (file: Blob) => {
  const buffer = Buffer.from(await file.arrayBuffer());

  const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);
  console.log(uploadDir,'================================================');

  try {
  await stat(uploadDir);
  
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
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
    const url = await writeFile(`${uploadDir}/${filename}`, buffer);
    console.log(url, "++++++++++++++++++++++++++++++++++++++++++++");

    const uploader = async (path: string) =>
      await uploadImage(path, "/buyitnow/avatars");

    const avatarResponse = await uploader(`${uploadDir}/${filename}`);
    return { ...avatarResponse };
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return new ErrorHandler("Something went wrong.", 500);
  }
};

export default uploderInPublic;
