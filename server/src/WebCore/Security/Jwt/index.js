const jsonWebToken = require("jsonwebtoken");
const Token = require("../../../WebApp/ModelsMongoDB/Token");

const ServerError = require("../../../WebApp/Models/ServerError.js");

const options = {
  issuer: process.env.JWT_ISSUER,
  subject: process.env.JWT_SUBJECT,
  audience: process.env.JWT_AUDIENCE,
};

const generateTokenAsync = async (user, tokenType) => {
  try {
    if (tokenType == "accessToken") {
      const accessToken = jsonWebToken.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET
        // { expiresIn: "10m" }
      );

      return accessToken;
    } else if (tokenType == "refreshToken") {
      const refreshToken = jsonWebToken.sign(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET
      );

      return refreshToken;
    } else {
      const confirmToken = jsonWebToken.sign(
        { code: "usercode" },
        process.env.CONFIRMATION_TOKEN_SECRET,
        { expiresIn: "5m" }
      );

      return confirmToken;
    }
  } catch (err) {
    console.trace(err);
    throw new ServerError("Eroare la semnarea tokenului!", 500);
  }
};

const verifyAndDecodeDataAsync = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, options);
    return decoded;
  } catch (err) {
    console.trace(err);
    throw new ServerError("Eroare la decriptarea tokenului!", 401);
  }
};

module.exports = {
  generateTokenAsync,
  verifyAndDecodeDataAsync,
};
