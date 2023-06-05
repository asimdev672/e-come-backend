const express = require("express");
const router = express.Router();
const { authMiddelware, isAdmin } = require("../middelwares/authMiddelware");
const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
} = require("../controller/coupnCtr");
router.post("/", authMiddelware, isAdmin, createCoupon);
router.get("/", authMiddelware, isAdmin, getAllCoupons);
router.get("/:id", authMiddelware, isAdmin, getAllCoupons);
router.put("/:id", authMiddelware, isAdmin, updateCoupon);
router.delete("/:id", authMiddelware, isAdmin, deleteCoupon);

module.exports = router;
