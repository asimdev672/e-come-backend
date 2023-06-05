const express = require("express");
const {
  creatBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  liketheBlog,
  disliketheBlog,
} = require("../controller/blogCtr");
const { authMiddelware, isAdmin } = require("../middelwares/authMiddelware");
const rout = express.Router();

rout.post("/", authMiddelware, isAdmin, creatBlog);
rout.put("/likes", authMiddelware, liketheBlog);
rout.put("/dislikes", authMiddelware, disliketheBlog);
rout.put("/:id", authMiddelware, isAdmin, updateBlog);
rout.get("/:id", getBlog);
rout.get("/", getAllBlog);
rout.delete("/:id", authMiddelware, isAdmin, deleteBlog);
module.exports = rout;
