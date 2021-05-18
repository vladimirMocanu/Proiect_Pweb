const express = require("express");

const ResponseFilter = require("../Filters/ResponseFilter.js");

const Router = express.Router();
const Topic = require("../ModelsMongoDB/Topic");

Router.post("/create", async (req, res) => {
  const title = new Topic({
    Title: req.body.Title,
    Description: req.body.Description,
    CreatedBy: req.body.CreatedBy,
    IdCategory: req.body.IdCategory,
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
  const title = await Topic.find();

  res.json(title);
  // ResponseFilter.setResponseDetails(title, 201);
});

Router.get("/:id", async (req, res) => {
  const cat = await Topic.find({
    IdCategory: req.params.id,
  });
  if (!cat) {
    res.status(404).send({ message: "Not found" });
  }

  res.json(cat);
  // ResponseFilter.setResponseDetails(title, 201);
});

module.exports = Router;
