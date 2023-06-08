const express = require("express");
const { authMiddelware, isAdmin } = require("../middelwares/authMiddelware");
const {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getallEnquiry,
} = require("../controller/enqCtr");
const router = express.Router();
router.post("/", createEnquiry);
router.put("/:id", authMiddelware, isAdmin, updateEnquiry);
router.delete("/:id", authMiddelware, isAdmin, deleteEnquiry);
router.get("/:id", getEnquiry);
router.get("/", getallEnquiry);
module.exports = router;
