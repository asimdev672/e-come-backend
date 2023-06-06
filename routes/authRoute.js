const express = require("express");
const {
  creatUser,
  loginUser,
  getAllUser,
  getUser,
  deleteUser,
  updateAuser,
  blockAuser,
  unblockAuser,
  handleRefeshTOken,
  logOut,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishList,
  saveUserAdress,
} = require("../controller/userController");
const { authMiddelware, isAdmin } = require("../middelwares/authMiddelware");
const router = express.Router();
// ************Auth route ************
router.post("/register", creatUser);
router.post("/login", loginUser);
router.post("/login-admin", loginAdmin);
router.get("/all-users", getAllUser);
router.get("/refresh", handleRefeshTOken);
router.get("/logout", logOut);
router.put("/password", authMiddelware, updatePassword);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);

router.get("/wishlist", authMiddelware, getWishList);
router.get("/:id", authMiddelware, isAdmin, getUser);
router.delete("/:id", deleteUser);
router.put("/edit-user", authMiddelware, updateAuser);
router.put("/save-adress", authMiddelware, saveUserAdress);
router.put("/block-user/:id", authMiddelware, isAdmin, blockAuser);
router.put("/unblock-user/:id", authMiddelware, isAdmin, unblockAuser);

module.exports = router;
