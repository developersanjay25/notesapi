const express = require("express");
require("dotenv").config();
const bp = require("body-parser");
const router = require("./routes/notesrouter");
const mongoose = require("mongoose");

const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");

const app = express();

const swaggeroptions = {
  swaggerDefinition: {
    info: { title: "Notes app" },
    description: "API",
    contact: {
      name: "sanjay",
    },
    servers: ["http://localhost:5000"],
  },
  apis: ["./Controller/*.js"],
};

const swaggerdocs = swaggerjsdoc(swaggeroptions);

app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerdocs));

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use("/", router);

mongoose
  .connect(process.env.mongodb)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`server started at port ${process.env.PORT}`);
});
