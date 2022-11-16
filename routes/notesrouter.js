const express = require("express");
const { postnotes, getnotes } = require("../Controller/notes");
const notesschema = require("../Model/notesSchema");
const app = express();

const router = express.Router();

router.get("/", (req, res) => {
  res.send("wecome to oru api");
});

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

router.post("/postnotes", async (req, res) => {
  postnotes(req, res);
});

router.get("/getnotes", async (req, res) => {
  getnotes(req, res);
});

router.delete("/getnotes/:id", async (req, res) => {
  deletenotes(req, res);
});

module.exports = router;
