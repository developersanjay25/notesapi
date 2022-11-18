const { default: mongoose } = require("mongoose");

const imageschema = mongoose.Schema({
  link: String,
});

module.exports = mongoose.model("Images", imageschema);
