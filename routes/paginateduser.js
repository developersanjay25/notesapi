const paginateduser = require("../Controller/paginateduser");

const paginatedrouter = require("express").Router();

paginatedrouter.get("/paginateduser/:page/:limit", (req, res) => {
  paginateduser(req, res);
});

module.exports = paginatedrouter;
