const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { validateMongooesId } = require("../utils/validateMongoDbId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
// creatUser
exports.creatUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    // creat new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already Exist");
  }
});

// loginUser
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // check user already exsit or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatch(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser?._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});
// refresh Token
exports.handleRefeshTOken = asyncHandler(async (req, res) => {
  const cookie = req?.cookies;
  console.log(cookie);
  if (!cookie?.refreshToken) throw new Error("No refreh token in cookie");
  const refreshToken = cookie.refreshToken;
  const user = await User.find({ refreshToken });
  if (!user) throw new Error("No refreshtoken present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECERT, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("Some thing wrong with token");
    }
    const accessToken = generateToken(user?.id);
    res.json({ accessToken });
  });
});
// logout functionality
exports.logOut = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// getAllUser
exports.getAllUser = asyncHandler(async (req, res) => {
  try {
    const allUser = await User.find();
    res.json(allUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a singel user
exports.getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooesId(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});
// Delete user
exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooesId(id);
  try {
    const dltUser = await User.findByIdAndDelete(id);
    res.json({
      message: "delete successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

//update User
exports.updateAuser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongooesId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      { new: true }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});
//block User
exports.blockAuser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooesId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      { new: true }
    );
    res.json({
      message: "user blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});
//unblock User
exports.unblockAuser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooesId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      { new: true }
    );
    res.json({
      message: "user UnBlock",
    });
  } catch (error) {
    throw new Error(error);
  }
});
