const Color = require("../models/colorModal");
const asyncHandler = require("express-async-handler");
const { validateMongooesId } = require("../utils/validateMongoDbId");

exports.createColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json(newColor);
  } catch (error) {
    throw new Error(error);
  }
});
exports.updateColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooesId(id);
  try {
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedColor);
  } catch (error) {
    throw new Error(error);
  }
});
exports.deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooesId(id);
  try {
    const deletedColor = await Color.findByIdAndDelete(id);
    res.json(deletedColor);
  } catch (error) {
    throw new Error(error);
  }
});
exports.getColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooesId(id);
  try {
    const getaColor = await Color.findById(id);
    res.json(getaColor);
  } catch (error) {
    throw new Error(error);
  }
});
exports.getallColor = asyncHandler(async (req, res) => {
  try {
    const getallColor = await Color.find();
    res.json(getallColor);
  } catch (error) {
    throw new Error(error);
  }
});
