const {
  registerValidation,
  loginValidation,
} = require("../../WebApp/Filters/UserValidation");

const {
  hashPasswordAsync,
  comparePlainTextToHashedPasswordAsync,
} = require("../Security/Password");
const { generateTokenAsync } = require("../Security/Jwt");
const ServerError = require("../../WebApp/Models/ServerError.js");
const User = require("../../WebApp/ModelsMongoDB/User");
const Token = require("../../WebApp/ModelsMongoDB/Token");

const authenticateAsync = async (req) => {
  console.info(`Authenticates user with email`);

  const { error } = loginValidation(req.body);
  if (error) return console.log("Error validate data!");

  const user = await User.findOne({
    Email: req.body.Email,
  });

  if (!user) {
    return console.log(`Email or password is wrong`);
  }
  var isOk = await comparePlainTextToHashedPasswordAsync(
    req.body.Password,
    user.Password
  );

  if (!isOk) {
    return console.log(`Email or password is wrong`);
  }

  const refreshToken = await generateTokenAsync(user, "refreshToken");
  const accessToken = await generateTokenAsync(user, "accessToken");
  const token22 = await Token.findOne({
    idUser: user._id,
  });

  if (!token22) {
    const token1 = new Token({
      idUser: user._id,
      token: refreshToken,
    });
    const token2 = await token1.save(); //try catch
  } else {
    const token1 = await Token.updateOne(
      { _id: token22._id },
      { $set: { token: refreshToken } }
    );
  }

  return [accessToken, refreshToken];
};

const registerAsync = async (req) => {
  // const hashedPassword = await hashPasswordAsync(plainTextPassword);

  // const user = await UsersRepository.addAsync(username, hashedPassword);

  // return new RegisteredUserDto(user.id, username);

  //Validate date
  const { error } = registerValidation(req.body);
  if (error) console.log("Error validate data!");

  //checking if the user is exist
  const userNameExist = await User.findOne({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
  });
  if (userNameExist) console.log("User name exist");

  const userEmailExist = await User.findOne({
    Email: req.body.Email,
  });
  if (userEmailExist) console.log("User email exist");

  //Encrypt password
  const encryptPassword = await hashPasswordAsync(req.body.Password);

  //Create/add new user
  const user = new User({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Password: encryptPassword,
    Role: "User",
  });
  return user;
};

module.exports = {
  authenticateAsync,
  registerAsync,
};
