const mongoose = require("mongoose");
exports.validateMongooesId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("This id is not valid or not found");
  }
};
