const notesschema = require("../Model/notesSchema");

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

const postnotes = async (req, res) => {
  const { title, content, images } = req.body;

  const newone = await new notesschema({
    title: title,
    content: content,
    images: images,
  });

  console.log(title);
  newone.save();
  res.json(newone);
};

const getnotes = async (req, res) => {
  const allnotes = await notesschema.find();
  console.log(allnotes);
  res.json(allnotes);
};

const deletenotes = async (req, res) => {
  const { id } = req.params;
  console.log(req);
  const res = await notesschema.deleteOne({ id });
};

module.exports = { postnotes, getnotes, deletenotes };
