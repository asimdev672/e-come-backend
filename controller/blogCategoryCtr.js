const BCategory = require("../models/blogCategoryModel");
const asyncHandler = require("express-async-handler");
const { validateMongooesId } = require("../utils/validateMongoDbId");

exports.createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await BCategory.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooesId(id);
  try {
    const updatedCategory = await BCategory.findByIdAndUpdate(id, req.body, {
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
    const deletedCategory = await BCategory.findByIdAndDelete(id);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});
exports.getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooesId(id);
  try {
    const getaCategory = await BCategory.findById(id);
    res.json(getaCategory);
  } catch (error) {
    throw new Error(error);
  }
});
exports.getallCategory = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await BCategory.find();
    res.json(getallCategory);
  } catch (error) {
    throw new Error(error);
  }
});
