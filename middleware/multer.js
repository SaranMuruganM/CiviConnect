import multer from "multer";

const storage = multer.diskStorage({
  filename: (res, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
