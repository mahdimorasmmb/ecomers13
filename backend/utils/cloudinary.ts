import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (imagePath: string, folder?: string | undefined) => {
  const options: cloudinary.UploadApiOptions | undefined = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    resource_type: "auto",
    folder,
  };

  try {
    // Upload the image
    const result = await cloudinary.v2.uploader.upload(imagePath, options);
    return { public_id: result.public_id, url: result.url };
  } catch (error) {
    console.error(error);
  }
};

export { uploadImage, cloudinary };
