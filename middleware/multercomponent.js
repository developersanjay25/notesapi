const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

module.exports = multer({ storage: storage });
//  .fields([
//     { name: "images", maxCount: 2 },
//   ]);
