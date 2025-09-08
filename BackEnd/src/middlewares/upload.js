// middlewares/upload.js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/resumes"); // You must create this folder
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /pdf|doc|docx/;
  const ext = path.extname(file.originalname).toLowerCase();
  const isValid = allowed.test(ext);
  isValid ? cb(null, true) : cb(new Error("Only PDF/DOC/DOCX allowed"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

export default upload;
