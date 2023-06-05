const express = require("express");
const {
  creatProduct,
  getAProduct,
  getAllProduct,
  updateAProduct,
  deleteAProduct,
  addToWishList,
} = require("../controller/productCtr");
const { authMiddelware, isAdmin } = require("../middelwares/authMiddelware");
const rout = express.Router();

rout.get("/", getAllProduct);
rout.get("/:id", getAProduct);
rout.put("/wishlist", authMiddelware, addToWishList);
rout.post("/", authMiddelware, isAdmin, creatProduct);
rout.put("/:id", authMiddelware, isAdmin, updateAProduct);
rout.delete("/:id", authMiddelware, isAdmin, deleteAProduct);

module.exports = rout;
