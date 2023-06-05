const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const { cloudinaryUploadImg } = require("../utils/cloudinary");
const { validateMongooesId } = require("../utils/validateMongoDbId");
const asyncHandler = require("express-async-handler");
const fs = require("fs");

//get All blog
exports.getAllBlog = asyncHandler(async (req, res) => {
  try {
    const AllBlog = await Blog.find();
    res.json(AllBlog);
  } catch (error) {
    throw new Error(error);
  }
});
//creat blog
exports.creatBlog = asyncHandler(async (req, res) => {
  try {
    const newBLog = await Blog.create(req.body);
    res.json(newBLog);
  } catch (error) {
    throw new Error(error);
  }
});
//update blog
exports.updateBlog = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  validateMongooesId(id);
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req?.body, {
      new: true,
    });
    res.json(updateBlog);
  } catch (error) {
    throw new Error(error);
  }
});
//Delete blog
exports.deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  console.log(id, "id");
  validateMongooesId(id);
  try {
    let deleteBlog = await Blog.findByIdAndDelete(id);
    res.json(deleteBlog);
  } catch (error) {
    throw new Error(error);
  }
});
//get A blog
exports.getBlog = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  validateMongooesId(id);
  try {
    const updateBlog = await Blog.findById(id)
      .populate("likes")
      .populate("dislikes");
    const updateVeiws = await Blog.findByIdAndUpdate(
      id,
      { $inc: { numViews: 1 } },
      {
        new: true,
      }
    );
    res.json(updateBlog);
  } catch (error) {
    throw new Error(error);
  }
});
exports.liketheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req?.body;
  validateMongooesId(blogId);
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the blog
  const isLiked = blog?.isLiked;
  // find if the user has disliked the blog
  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});
exports.disliketheBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongooesId(blogId);
  // Find the blog which you want to be liked
  const blog = await Blog.findById(blogId);
  // find the login user
  const loginUserId = req?.user?._id;
  // find if the user has liked the blog
  const isDisLiked = blog?.isDisliked;
  // find if the user has disliked the blog
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
});
//upload images
exports.uploadBlogImages = asyncHandler(async (req, res) => {
  // console.log(req?.files);
  const { id } = req?.params;
  validateMongooesId(id);

  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req?.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => file),
      },
      { new: true }
    );
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});
