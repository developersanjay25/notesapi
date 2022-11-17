const authschema = require("../Model/authschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/notesrouter");

const signin = async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const passwordd = await bcrypt.hash(password, salt);

  const user = await authschema.findOne({ username });

  if (!user) {
    const signup = await new authschema({ username, password: passwordd });
    signup.save((err) => {
      if (err) throw err;
    });
    return res.send({
      message: "your sign in success login with this account now",
      status: "success",
    });
  }
  return res
    .status(401)
    .send({ message: "failed", reason: "User name already taken" });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await authschema.findOne({ username });

  if (!user) {
    return res.status(401).send("can't find user");
  }
  const pass = await bcrypt.compare(password, user.password);

  if (!pass) {
    return res
      .status(401)
      .send({ status: "failed", message: "password incorrect" });
  }

  const payload = { _id: user.id };
  const token = jwt.sign(payload, "secret", { expiresIn: 36000 });
  return res.send({
    status: "success",
    message: "Successfully logged in",
    token,
  });
};

module.exports = { login, signin };
