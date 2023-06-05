const cloudinary = require("cloudinary");

// Configuration
console.log("process.env.CLOUDY_NAME", process.env.CLOUDY_NAME);
console.log("process.env.API_KEY", process.env.API_KEY);
cloudinary.config({
  cloud_name: "ducbkgshz",
  api_key: "981831431479331",
  api_secret: "Iv1v8uAb8dwWzeoBj-zhEkalNpE",
});

exports.cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUploads, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};
exports.cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};
