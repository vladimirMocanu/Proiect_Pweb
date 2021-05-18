const mongoose = require("mongoose");

const CatSchema = mongoose.Schema(
  {
    Title: {
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

module.exports = mongoose.model("Category", CatSchema);
