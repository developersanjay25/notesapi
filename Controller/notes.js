const notesschema = require("../Model/notesSchema");
const multer = require("multer");
const imagesschema = require("../Model/imagesschema");
const uploads = require("../middleware/multercomponent");

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

// Post Notes
const postnotes = async (req, res) => {
  try {
    const images = [];

    const newone = new notesschema({
      title: req.body.title,
      content: req.body.content,
      images: images,
      image1: images,
      user: req.user,
    });
    const domainlink = `${req.protocol}://${req.get("host")}`;

    req.files["images"]?.map((item) => {
      newone.images.push({ link: `${domainlink}/uploads/${item.filename}` });
    });

    const imgschema = new imagesschema({
      images: [],
    });

    req.files["images"]?.map((item) => {
      imgschema.images.push({
        link: `${domainlink}/uploads/${item.filename}`,
      });
    });

    await imgschema.save();

    newone.image1 = imgschema._id;

    await newone.save();
    return res.json(newone);
  } catch (error) {
    console.log(error);
  }
};

// Get notes
const getnotes = async (req, res) => {
  const allnotes = await notesschema
    .find({ user: req.user })
    .populate("image1");
  res.send(allnotes);
};

// Delete notes
const deletenotes = async (req, res) => {
  const { id } = req.params;

  const data = await notesschema.findById(id);
  const resp = await imagesschema.deleteOne({ _id: data.image1 });
  const response = await notesschema.deleteOne({ _id: id });

  if (response.acknowledged && resp.acknowledged) {
    return res.send({ message: "success" });
  }
  return res.status(500).send({ message: "error", reason: response });
};

// Edit Notes
const editnotes = async (req, res) => {
  const { id } = req.params;
  const findnotes = await notesschema.findById(id);

  if (!findnotes)
    return res
      .send(404)
      .status({ status: "error", message: "Account not found" });

  const images = [];

  req.files?.images?.map((item) => {
    images.push({ link: item.path });
  });
  let update;
  try {
    update = await imagesschema.updateOne(
      { _id: findnotes?.image1 },
      {
        $push: { images: { $each: images } },
      }
    );

    await notesschema.updateOne({ _id: id }, { $set: req.body });

    return res.send({
      status: "success",
      message: { update, findnotes, images, body: req.body },
    });
  } catch (error) {
    res.send(error);
  }
  return res.status(500).send({ status: "error", message: update });
};

// Delete image
const deleteimages = async (req, res) => {
  const { id, imgid } = req.params;
  try {
    const find = await imagesschema.updateOne(
      { _id: id },
      { $pull: { images: { _id: imgid } } },
      { new: true }
    );

    if (find.modifiedCount > 0) {
      return res.send({ message: "Modified successfully" });
    }
    return res.status(500).send({ message: "error" });
  } catch (err) {
    return res.send(err);
  }
};

module.exports = { postnotes, getnotes, deletenotes, editnotes, deleteimages };
