const Coupon = require("../models/coupnModel");
const asynHandler = require("express-async-handler");
const { validateMongooesId } = require("../utils/validateMongoDbId");

exports.createCoupon = asynHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});
exports.getAllCoupons = asynHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    throw new Error(error);
  }
});
exports.updateCoupon = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooesId(id);
  try {
    const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatecoupon);
  } catch (error) {
    throw new Error(error);
  }
});
exports.deleteCoupon = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooesId(id);
  try {
    const deletecoupon = await Coupon.findByIdAndDelete(id);
    res.json(deletecoupon);
  } catch (error) {
    throw new Error(error);
  }
});
exports.getCoupon = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooesId(id);
  try {
    const getAcoupon = await Coupon.findById(id);
    res.json(getAcoupon);
  } catch (error) {
    throw new Error(error);
  }
});
