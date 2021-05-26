const mongoose = require("mongoose");

const Comment = mongoose.Schema(
  {
    Content: {
      type: String,
      require: true,
    },
    CreatedBy: {
      type: String,
      require: false,
    },
    IdTopic: {
      type: String,
      require: true,
    },
    CreatedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Comment", Comment);
