const PCategory = require("../models/productCategoryModel");
const asyncHandler = require("express-async-handler");
const { validateMongooesId } = require("../utils/validateMongoDbId");

exports.createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await PCategory.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooesId(id);
  try {
    const updatedCategory = await PCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooesId(id);
  try {
    const deletedCategory = await PCategory.findByIdAndDelete(id);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});
exports.getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooesId(id);
  try {
    const getaCategory = await PCategory.findById(id);
    res.json(getaCategory);
  } catch (error) {
    throw new Error(error);
  }
});
exports.getallCategory = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await PCategory.find();
    res.json(getallCategory);
  } catch (error) {
    throw new Error(error);
  }
});
