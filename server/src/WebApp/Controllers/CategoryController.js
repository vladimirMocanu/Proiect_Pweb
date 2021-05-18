const express = require("express");

const ResponseFilter = require("../Filters/ResponseFilter.js");

const Router = express.Router();
const TitleCat = require("../ModelsMongoDB/TitleCat");

Router.post("/create", async (req, res) => {
  const title = new TitleCat({
    Title: req.body.Title,
  });
  try {
    const title1 = await title.save();
    //res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }

  ResponseFilter.setResponseDetails(res, 201);
});

Router.get("/", async (req, res) => {
  const title = await TitleCat.find();

  res.json(title);
  // ResponseFilter.setResponseDetails(title, 201);
});

Router.get("/:id", async (req, res) => {
  const cat = await TitleCat.findById(req.params.id);
  if (!cat) {
    res.status(404).send({ message: "Not found" });
  }

  res.json(cat);
  // ResponseFilter.setResponseDetails(title, 201);
});

module.exports = Router;
