const { default: mongoose } = require("mongoose");

const auth = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, require: true },
});

module.exports = mongoose.model("auth", auth);
