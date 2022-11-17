const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const tokendata = req.headers.authorization;

  if (!tokendata) {
    return res
      .status(403)
      .send({ status: "failed", message: "token not valid" });
  }
  token = tokendata.split(" ")[1];
  try {
    const verify = jwt.verify(token, "secret");

    req.user = verify._id;
    next();
  } catch (err) {
    return res.send({ status: "failed", message: err });
  }
};

module.exports = authentication;
