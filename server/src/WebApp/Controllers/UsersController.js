const express = require("express");
const jwt = require("jsonwebtoken");
const sessionStorage = require("sessionstorage");
const UsersManager = require("../../WebCore/Managers/UsersManager.js");
const nodemailer = require("../../WebCore/Security/nodemailer.config");
//const UsersRepository = require("../../Infrastructure/PostgreSQL/Repository/UsersRepository.js");

// const {
//   UserBody,
//   UserRegisterResponse,
//   UserLoginResponse,
// } = require("../Models/Users.js");
const ResponseFilter = require("../Filters/ResponseFilter.js");
const Token = require("../ModelsMongoDB/Token.js");
const User = require("../ModelsMongoDB/User.js");
// const JWTFilter = require("../Filters/JWTFilter.js");
// const AuthorizationFilter = require("../Filters/AuthorizationFilter.js");
// const RoleConstants = require("../Constants/Roles.js");

const Router = express.Router();

Router.post("/register", async (req, res) => {
  //const userBody = new UserBody(req.body);
  const user = await UsersManager.registerAsync(req, res);
  try {
    nodemailer.sendConfirmationEmail(
      user.FirstName,
      user.Email,
      user.ConfirmationToken
    );
    console.log("email sent");
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
      await UsersManager.authenticateAsync(req, res);
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
  const token = req.query.token;
  console.log(token);
  if (token === undefined) return;
  const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(_id);
  let response = null;
  if (user) {
    response = user;
  }
  res.send({ user: response });
});

Router.get(
  "/:id",
  // JWTFilter.authorizeAndExtractTokenAsync,
  // AuthorizationFilter.authorizeRoles(RoleConstants.ADMIN),
  async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send({ message: "Not found" });
    }

    res.json(user);
  }
);

Router.get(
  "/",
  // JWTFilter.authorizeAndExtractTokenAsync,
  // AuthorizationFilter.authorizeRoles(RoleConstants.ADMIN),
  async (req, res) => {
    const user = await User.find();
    if (!user) {
      res.status(404).send({ message: "Not found" });
    }
    res.json(user);
  }
);

Router.get(
  "/graph/user",
  // JWTFilter.authorizeAndExtractTokenAsync,
  // AuthorizationFilter.authorizeRoles(RoleConstants.ADMIN),
  async (req, res) => {
    const user = await User.aggregate([
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

Router.get(
  "/confirm/:id",
  // JWTFilter.authorizeAndExtractTokenAsync,
  // AuthorizationFilter.authorizeRoles(RoleConstants.ADMIN),
  async (req, res) => {
    const user = await User.findOne({
      ConfirmationToken: req.params.id,
    });

    if (!user) {
      res.status(404).send({ message: "Not found" });
    }

    user.Status = "Active";

    try {
      const newUser = await user.save();
    } catch (e) {
      res.status(400).send("Wrong");
    }

    console.log(user);
    ResponseFilter.setResponseDetails(res, 201);
  }
);

//Delete refreshtoken from DB => logout user
Router.delete("/logout", async (req, res) => {
  console.log(req.body.idUser);
  try {
    const deleteRefreshToken = await Token.deleteOne({
      idUser: req.body.idUser,
    });
    //return res.sendStatus(204).send("Logout successfully");
  } catch (err) {
    return res.sendStatus(401).send("eroare3");
  }

  ResponseFilter.setResponseDetails(res, 201);
});

Router.delete("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const deleteUser = await User.deleteOne({
      Email: req.params.id,
    });
    //return res.sendStatus(204).send("Logout successfully");
  } catch (err) {
    return res.sendStatus(401).send("eroare3");
  }

  ResponseFilter.setResponseDetails(res, 201);
});

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
