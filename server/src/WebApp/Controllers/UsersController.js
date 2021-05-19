const express = require("express");
const jwt = require("jsonwebtoken");
const sessionStorage = require("sessionstorage");

const UsersManager = require("../../WebCore/Managers/UsersManager.js");
//const UsersRepository = require("../../Infrastructure/PostgreSQL/Repository/UsersRepository.js");

// const {
//   UserBody,
//   UserRegisterResponse,
//   UserLoginResponse,
// } = require("../Models/Users.js");
const ResponseFilter = require("../Filters/ResponseFilter.js");
const User = require("../ModelsMongoDB/User.js");
// const JWTFilter = require("../Filters/JWTFilter.js");
// const AuthorizationFilter = require("../Filters/AuthorizationFilter.js");
// const RoleConstants = require("../Constants/Roles.js");

const Router = express.Router();

Router.post("/register", async (req, res) => {
  //const userBody = new UserBody(req.body);
  const user = await UsersManager.registerAsync(req);
  try {
    const newUser = await user.save();
    //res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }

  ResponseFilter.setResponseDetails(res, 201);
});

Router.post("/login", async (req, res) => {
  // const userBody = new UserBody(req.body);

  try {
    const [accessToken, refreshToken, userId] =
      await UsersManager.authenticateAsync(req);
    res.header("Authorization", accessToken).send({
      accessToken: accessToken,
      refreshToken: refreshToken,
      userId: userId,
    });
  } catch (e) {
    res.status(400).send("Email or password is wrong");
  }
  //const user = new UserLoginResponse(userDto.Token, userDto.Role);
});

Router.get("/init", async (req, res) => {
  const { _id } = jwt.verify(req.query.token, process.env.ACCESS_TOKEN_SECRET);
  console.log(_id);
  const user = await User.findById(_id);
  let response = null;
  if (user) {
    response = user;
  }
  res.send({ user: response });
});

// Router.get(
//   "/",
//   JWTFilter.authorizeAndExtractTokenAsync,
//   AuthorizationFilter.authorizeRoles(RoleConstants.ADMIN),
//   async (req, res) => {
//     const users = await UsersRepository.getAllAsync();

//     ResponseFilter.setResponseDetails(
//       res,
//       200,
//       users.map((user) => new UserRegisterResponse(user))
//     );
//   }
// );

// Router.put(
//   "/:userId/role/:roleId",
//   JWTFilter.authorizeAndExtractTokenAsync,
//   AuthorizationFilter.authorizeRoles(RoleConstants.ADMIN),
//   async (req, res) => {
//     let { userId, roleId } = req.params;

//     userId = parseInt(userId);
//     roleId = parseInt(roleId);

//     await UsersRepository.updateUserRoleAsync(userId, roleId);

//     ResponseFilter.setResponseDetails(res, 204);
//   }
// );

module.exports = Router;
