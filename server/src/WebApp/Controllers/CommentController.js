const express = require("express");

const ResponseFilter = require("../Filters/ResponseFilter.js");

const Router = express.Router();
const Comment = require("../ModelsMongoDB/Comment");

Router.post("/create", async (req, res) => {
  const title = new Comment({
    Content: req.body.Content,
    CreatedBy: req.body.CreatedBy,
    IdTopic: req.body.IdTopic,
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
  const cat = await Comment.find({
    IdTopic: req.params.id,
  });
  if (!cat) {
    res.status(404).send({ message: "Not found" });
  }

  res.json(cat);
  // ResponseFilter.setResponseDetails(title, 201);
});

Router.delete("/:id/:id", async (req, res) => {
  console.log(req.params.id);
  const topic = await Comment.deleteOne({
    _id: req.params.id,
  });
  if (!topic) {
    res.status(404).send({ message: "Not found" });
  }

  // ResponseFilter.setResponseDetails(title, 201);
});

module.exports = Router;
