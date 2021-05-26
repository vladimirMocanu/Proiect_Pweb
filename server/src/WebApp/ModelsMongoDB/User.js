const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      require: true,
      min: 6,
      max: 255,
    },
    LastName: {
      type: String,
      require: true,
      min: 6,
      max: 255,
    },
    Email: {
      type: String,
      require: true,
      min: 6,
      max: 255,
    },
    Password: {
      type: String,
      require: true,
      min: 6,
      max: 255,
    },
    ConfirmPassword: {
      type: String,
      require: true,
      min: 6,
      max: 255,
    },
    Role: {
      type: String,
      min: 6,
      max: 255,
    },
    CreatedDate: {
      type: Date,
      default: Date.now,
    },
    Status: {
      type: String,
      enum: ["Pending", "Active"],
      default: "Pending",
    },
    ConfirmationToken: {
      type: String,
      require: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("users", UserSchema);
