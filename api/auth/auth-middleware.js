const userModel = require("../users/users-model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/config");
const TokenBlacklist = require("../../helpers/helper");

const isEmailExist = async (req, res, next) => {
  const { email } = req.body;
  const users = await userModel.getByFilter({ email: email });
  if (users.length == 0) {
    next({ status: 401, message: "Invalid credentials!.." });
  } else {
    req.user = users[0];
    next();
  }
};

const hashPassword = async (req, res, next) => {
  try {
    const hashpassword = bcryptjs.hashSync(req.body.password, 10);
    req.body.password = hashpassword;
    next();
  } catch (error) {
    next(error);
  }
};

const passwordCheck = async (req, res, next) => {
  if (bcryptjs.compareSync(req.body.password, req.user.password)) {
    next();
  } else {
    next({ status: 401, message: "Invalid credentials!.." });
  }
};

const generateToken = async (req, res, next) => {
  try {
    const { user } = req;
    const payload = {
      userId: user.id,
      username: user.username,
    };
    const options = {
      expiresIn: "4h",
    };
    const token = jwt.sign(payload, JWT_SECRET, options);
    req.user.token = token;
    next();
  } catch (error) {
    next(error);
  }
};

const restricted = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, JWT_SECRET, (error, decodedJWT) => {
        if (!error) {
          req.decodedUser = decodedJWT;
          next();
        } else {
          next(error);
        }
      });
    } else {
      next({ status: 400, message: "Token is required!.." });
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next({ status: 403, message: "Token is required to log out!" });
    } else {
      const isTokenBlacklisted = await TokenBlacklist.exists(token);
      if (isTokenBlacklisted) {
        return next({ status: 403, message: "Token is already blacklisted!" });
      }

      await TokenBlacklist.create({ token });
    }

    // Remove the token from the response headers
    res.removeHeader("authorization");
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isEmailExist,
  hashPassword,
  passwordCheck,
  generateToken,
  restricted,
  logout,
};
