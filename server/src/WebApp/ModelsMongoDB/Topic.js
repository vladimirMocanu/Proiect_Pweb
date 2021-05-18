const mongoose = require("mongoose");

const Topic = mongoose.Schema(
  {
    Title: {
      type: String,
      require: true,
    },
    Description: {
      type: String,
      require: true,
    },
    CreatedBy: {
      type: String,
      require: false,
    },
    IdCategory: {
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

module.exports = mongoose.model("Topic", Topic);
