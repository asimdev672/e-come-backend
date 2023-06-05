const express = require("express");
const {
  creatBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  liketheBlog,
  disliketheBlog,
  uploadBlogImages,
} = require("../controller/blogCtr");
const { authMiddelware, isAdmin } = require("../middelwares/authMiddelware");
const {
  productImgResize,
  uploadPhoto,
} = require("../middelwares/uploadImages");
const rout = express.Router();

rout.post("/", authMiddelware, isAdmin, creatBlog);
rout.put("/likes", authMiddelware, liketheBlog);
rout.put("/dislikes", authMiddelware, disliketheBlog);
rout.put("/:id", authMiddelware, isAdmin, updateBlog);
rout.get("/:id", getBlog);
rout.get("/", getAllBlog);
rout.delete("/:id", authMiddelware, isAdmin, deleteBlog);
// upload images
rout.put(
  "/upload/:id",
  authMiddelware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadBlogImages
);
module.exports = rout;
