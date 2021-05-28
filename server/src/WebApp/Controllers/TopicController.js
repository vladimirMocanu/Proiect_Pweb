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
    return res.status(404).send({ message: "Not found" });
  }

  res.json(cat);
  // ResponseFilter.setResponseDetails(title, 201);
});

Router.get("/getTopic/:id", async (req, res) => {
  const cat = await Topic.findById(req.params.id);
  if (!cat) {
    return res.status(404).send({ message: "Not found" });
  }

  res.json(cat);
  // ResponseFilter.setResponseDetails(title, 201);
});

Router.delete("/:id/:id", async (req, res) => {
  const topic = await Topic.deleteOne({
    _id: req.params.id,
  });
  if (!topic) {
    res.status(404).send({ message: "Not found" });
  }

  // ResponseFilter.setResponseDetails(title, 201);
});

Router.get(
  "/graph/topic",
  // JWTFilter.authorizeAndExtractTokenAsync,
  // AuthorizationFilter.authorizeRoles(RoleConstants.ADMIN),
  async (req, res) => {
    const user = await Topic.aggregate([
      {
        $group: {
          _id: {
            Month: { $month: "$CreatedDate" },
          },
          count: { $sum: { $cond: [{ $eq: ["$source", "$month"] }, 1, 0] } },
        },
      },
    ]);
    if (!user) {
      res.status(404).send({ message: "Not found" });
    }

    res.json(user);
  }
);

module.exports = Router;
