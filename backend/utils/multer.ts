import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    console.log(req);
    callback(null, "public/uploads");
  },
  filename(req, file, callback) {
    console.log(req);
    
    callback(null, new Date().toISOString() + "=" + file.originalname);
  },
});

const upload = multer({
  
  storage,
  limits: { fieldSize: 1024 * 1024 },
  fileFilter(req, file, callback) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpng"
    ) {
        console.log('render');
        
      callback(null, true);
    } else {
      callback(new Error("Unsupport file format. Upload only JPEG/JPG or PNG"));
    }
  },
});



export default upload