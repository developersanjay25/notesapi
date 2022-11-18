const mongoose = require("mongoose");

const images = mongoose.Schema({ link: String });
const imageschema = mongoose.model("images", images);

const notesschema = mongoose.Schema({
  title: { type: String },
  content: { type: String },
  image1: { type: mongoose.Schema.Types.ObjectId, ref: "Images" },
  images: [images],
  user: { type: String, require: true },
});

module.exports = mongoose.model("notes", notesschema);
