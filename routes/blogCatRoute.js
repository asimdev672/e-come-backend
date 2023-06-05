const express = require("express");
const router = express.Router();
const { authMiddelware, isAdmin } = require("../middelwares/authMiddelware");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
} = require("../controller/blogCategoryCtr");

router.post("/", authMiddelware, isAdmin, createCategory);
router.put("/:id", authMiddelware, isAdmin, updateCategory);
router.delete("/:id", authMiddelware, isAdmin, deleteCategory);
router.get("/:id", getCategory);
router.get("/", getallCategory);
module.exports = router;
