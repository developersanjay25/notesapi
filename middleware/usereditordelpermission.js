const notesSchema = require("../Model/notesSchema");

const usereditordeloermission = async (req, res, next) => {
  const notes = await notesSchema.findById(req.params.id);
  if (notes?.user !== req.user) {
    res.status(401);
    return res.send({ status: "failed", message: "not permitted to delete" });
  }
  next();
};

module.exports = usereditordeloermission;
