const Post = require("../models/postModel");

/**
 * get all post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "error",
    });
  }
};

/**
 * Get Post by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getOnePost = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                post,
            },
        });
    } catch (e) {
        res.status(400).json({
            status: "error",
        });
    }
}

/**
 * Create post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createPost = async(req, res, next) => {
    try {
        const post = await Post.create(req.body);
        res.status(200).json({
            status: "success",
            data: {
                post,
            },
        });
    } catch (e) {
        res.status(400).json({
            status: "error",
        });
    }
}

/**
 * Update post by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updatePost = async(req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: {
                post,
            },
        });
    } catch (e) {
        res.status(400).json({
            status: "error",
        });
    }
}

/**
 * Delete post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deletePost = async(req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
        });
    } catch (e) {
        res.status(400).json({
            status: "error",
        });
    }
}