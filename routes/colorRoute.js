const express = require("express");
const { authMiddelware, isAdmin } = require("../middelwares/authMiddelware");
const {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getallColor,
} = require("../controller/colorCtr");
const router = express.Router();

router.post("/", authMiddelware, isAdmin, createColor);
router.put("/:id", authMiddelware, isAdmin, updateColor);
router.delete("/:id", authMiddelware, isAdmin, deleteColor);
router.get("/:id", getColor);
router.get("/", getallColor);

module.exports = router;
