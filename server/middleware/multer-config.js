const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    try {
      const name = file.originalname
        .split(" ")
        .join("_")
        .replace(/\.jpeg|\.jpg|\.png/g, "_");
      const extension = MIME_TYPES[file.mimetype];
      if (!extension) {
        throw new Error("Invalid file type");
      }
      callback(null, name + Date.now() + "." + extension);
    } catch (error) {
      callback(error, null);
    }
  },
});

const upload = multer({ storage: storage }).single("image");

const uploadMiddleware = (req, res, next) => {
  try {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ error: "Multer Error", message: err.message });
      } else if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      next();
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = uploadMiddleware;
