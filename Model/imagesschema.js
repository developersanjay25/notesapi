const { default: mongoose } = require("mongoose");

const images = mongoose.Schema({ link: String });

const imageschema = mongoose.Schema({
  images: [images],
});

module.exports = mongoose.model("Images", imageschema);
