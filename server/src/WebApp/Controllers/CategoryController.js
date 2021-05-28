const express = require("express");

const ResponseFilter = require("../Filters/ResponseFilter.js");

const Router = express.Router();
const TitleCat = require("../ModelsMongoDB/TitleCat");
const Topic = require("../ModelsMongoDB/Topic.js");

Router.post("/create", async (req, res) => {
  const title = new TitleCat({
    Title: req.body.Title,
    Description: req.body.Description,
    CreatedBy: req.body.CreatedBy,
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

Router.delete("/:id", async (req, res) => {
  const cat = await TitleCat.deleteOne({
    _id: req.params.id,
  });
  if (!cat) {
    res.status(404).send({ message: "Not found" });
  }

  const deletetopic = await Topic.deleteMany({
    IdCategory: req.params.id,
  });
  if (!deletetopic) {
    res.status(404).send({ message: "Not found" });
  }

  // ResponseFilter.setResponseDetails(title, 201);
});

Router.get(
  "/graph/category",
  // JWTFilter.authorizeAndExtractTokenAsync,
  // AuthorizationFilter.authorizeRoles(RoleConstants.ADMIN),
  async (req, res) => {
    const user = await TitleCat.aggregate([
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
