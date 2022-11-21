const authschema = require("../Model/authschema");

const paginateduser = async (req, res) => {
  const { page, limit } = req.params;

  const startindex = Number(page - 1) * limit;
  const endindex = Number(page) * limit;

  const result = {};

  if (startindex > 0) {
    result.prevpage = page - 1;
  }
  if (endindex < (await authschema.countDocuments().exec())) {
    result.nextpage = Number(page) + 1;
  }

  const user = await authschema.find({}).limit(limit).skip(startindex);

  return res.send({ status: "success", data: { ...result, ...user } });
};

module.exports = paginateduser;
