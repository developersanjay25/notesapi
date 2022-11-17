const express = require("express");
const { login, signin } = require("../Controller/login");
const { postnotes, getnotes, deletenotes } = require("../Controller/notes");
const authentication = require("../middleware/auth");
const authschema = require("../Model/authschema");
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
router.post("/signin", async (req, res) => {
  signin(req, res);
});

router.post("/login", async (req, res) => {
  login(req, res);
});

router.post("/postnotes", authentication, async (req, res) => {
  postnotes(req, res);
});

router.get("/getnotes", authentication, async (req, res) => {
  getnotes(req, res);
});

router.delete("/deletenotes/:id", authentication, async (req, res) => {
  deletenotes(req, res);
});

module.exports = router;
