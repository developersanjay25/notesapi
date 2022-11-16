const mongoose = require("mongoose");

const notesschema = mongoose.Schema({
  title: { type: String },
  content: { type: String },
  images: { type: Array },
});

module.exports = mongoose.model("notes", notesschema);
