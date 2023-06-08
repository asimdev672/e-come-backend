const express = require("express");
const {
  creatProduct,
  getAProduct,
  getAllProduct,
  updateAProduct,
  deleteAProduct,
  addToWishList,
  uploadProductImages,
  deleteProductImages,
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
// upload images
rout.put(
  "/upload",
  authMiddelware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadProductImages
);
rout.put("/:id", authMiddelware, isAdmin, updateAProduct);
rout.delete("/:id", authMiddelware, isAdmin, deleteAProduct);
rout.delete("/delete-img/:id", authMiddelware, isAdmin, deleteProductImages);

module.exports = rout;
