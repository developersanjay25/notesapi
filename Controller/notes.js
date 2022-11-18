const notesschema = require("../Model/notesSchema");
const multer = require("multer");

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Book:
//  *       type: object
//  *       required:
//  *         - title
//  *         - author
//  *       properties:
//  *         id:
//  *           type: string
//  *           description: The auto-generated id of the book
//  *         title:
//  *           type: string
//  *           description: The book title
//  *         author:
//  *           type: string
//  *           description: The book author
//  *       example:
//  *         id: d5fE_asz
//  *         title: The New Turing Omnibus
//  *         author: Alexander K. Dewdney
//  */

/**
 * @swagger
 * /postnotes:
 *   post:
 *     summary: Create a new book
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notes'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /getnotes:
 *   get:
 *     summary: get all notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *       500:
 *         description: Some server error
 */

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage }).fields([
  { name: "images", maxCount: 2 },
]);

const postnotes = async (req, res) => {
  try {
    uploads(req, res, async (err) => {
      if (err) return res.send(err);

      const images = [];

      req.files["images"]?.map((item) => {
        images.push(item.path);
      });

      const newone = await new notesschema({
        title: req.body.title,
        content: req.body.content,
        images: images,
        user: req.user,
      });

      newone.save();
      return res.json(newone);
    });
  } catch (error) {
    console.log(error);
  }
};

const getnotes = async (req, res) => {
  const allnotes = await notesschema.find({ user: req.user });
  res.json(allnotes);
};

const deletenotes = async (req, res) => {
  const { id } = req.params;
  const response = await notesschema.deleteOne({ _id: id });

  if (response.acknowledged) {
    res.send({ message: "success" });
  }
  res.status(500).send({ message: "error", reason: response });
};

const editnotes = async (req, res) => {
  const { id } = req.params;
  const findnotes = await notesschema.findOne({ _id: id });

  if (!findnotes)
    return res
      .send(404)
      .status({ status: "error", message: "Account not found" });
  uploads(req, res, async (err) => {
    if (err) return res.send({ status: err, message: err });

    const images = [];

    req.files?.images?.map((item) => {
      images.push(item.path);
    });

    const update = await notesschema.updateOne(
      { _id: id },
      {
        $set: { title: req.body.title },
        $push: { images: { $each: images } },
      }
    );

    if (update.acknowledged) {
      return res.send({ status: "success", message: "success" });
    }
    return res.status(500).send({ status: "error", message: update });
  });
};

module.exports = { postnotes, getnotes, deletenotes, editnotes };
