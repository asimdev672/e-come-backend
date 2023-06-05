const express = require("express");
const router = express.Router();
const { authMiddelware, isAdmin } = require("../middelwares/authMiddelware");
const {
  updateBrand,
  createBrand,
  deleteBrand,
  getBrand,
  getallBrand,
} = require("../controller/brandCtr");

router.post("/", authMiddelware, isAdmin, createBrand);
router.put("/:id", authMiddelware, isAdmin, updateBrand);
router.delete("/:id", authMiddelware, isAdmin, deleteBrand);
router.get("/:id", getBrand);
router.get("/", getallBrand);

module.exports = router;
