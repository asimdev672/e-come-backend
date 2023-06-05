const express = require("express");
const {
  creatProduct,
  getAProduct,
  getAllProduct,
  updateAProduct,
  deleteAProduct,
  addToWishList,
  uploadProductImages,
} = require("../controller/productCtr");
const { authMiddelware, isAdmin } = require("../middelwares/authMiddelware");
const {
  uploadPhoto,
  productImgResize,
} = require("../middelwares/uploadImages");
const rout = express.Router();

rout.get("/", getAllProduct);
rout.get("/:id", getAProduct);
rout.put("/wishlist", authMiddelware, addToWishList);
rout.post("/", authMiddelware, isAdmin, creatProduct);
rout.put("/:id", authMiddelware, isAdmin, updateAProduct);
rout.delete("/:id", authMiddelware, isAdmin, deleteAProduct);
// upload images
rout.put(
  "/upload/:id",
  authMiddelware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadProductImages
);
module.exports = rout;
