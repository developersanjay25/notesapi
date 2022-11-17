const mongoose = require("mongoose");

const notesschema = mongoose.Schema({
  title: { type: String },
  content: { type: String },
  images: { type: Array },
  user: { type: String, require: true },
});

module.exports = mongoose.model("notes", notesschema);
