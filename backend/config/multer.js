const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const CustomError = require("../errors/CustomError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/data/images/");
  },

  filename: function (req, file, cb) {
    try {
      const fileExtension = path.extname(file.originalname).toLowerCase();
      const acceptedImageFileTypes = [".jpg", ".png", ".gif"];
      if (!acceptedImageFileTypes.includes(fileExtension)) {
        throw new CustomError("Uploaded file needs to be of type image", 400);
      }

      cb(null, uuidv4() + path.extname(file.originalname));
    } catch (error) {
      cb(error);
    }
  },
});

const imageUpload = multer({ storage: storage });

module.exports = { imageUpload };
