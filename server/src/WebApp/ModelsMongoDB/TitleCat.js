const mongoose = require("mongoose");

const CatSchema = mongoose.Schema(
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
    CreatedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Category", CatSchema);
