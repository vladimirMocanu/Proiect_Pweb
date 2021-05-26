const Router = require("express").Router();

//const { authorizeAndExtractTokenAsync } = require("../Filters/JWTFilter.js");

const UsersController = require("./UsersController.js");
const CreateCat = require("./CategoryController");
const Topic = require("./TopicController");
const Comment = require("./CommentController");
//const RolesController = require("./RolesController.js");

/**
 * TODO import controllers
 */

Router.use("/v1/users", UsersController);
Router.use("/v1/category", CreateCat);
Router.use("/v1/topic", Topic);
Router.use("/v1/comment", Comment);
//Router.use("/v1/roles", authorizeAndExtractTokenAsync, RolesController);

/**
 * TODO add controllers to main router
 */

module.exports = Router;
