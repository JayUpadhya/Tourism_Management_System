const express = require("express");
const Posts = require("../Rent/R_posts");
const router = express.Router();
const Vehicles = require("../Rent/R_addvehicle");

// save posts
router.post("/post/save", async (req, res) => {
  try {
    let newPost = new Posts(req.body);
    await newPost.save();
    return res.status(200).json(
      {
        success: "Posts saved successfully",
      },
    );
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// get posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Posts.find({});
    return res.status(200).json({
      success: true,
      existingPosts: posts,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// update routers
router.put("/post/update/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: "Updated successfully",
      updatedPost: post,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// delete post
router.delete("/post/delete/:id", async (req, res) => {
  try {
    const deletedPost = await Posts.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Delete successful",
      deletedPost: deletedPost,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Delete unsuccessful",
      error: err.message,
    });
  }
});

// get a specific post
router.get("/post/:id", async (req, res) => {
  let postId = req.params.id;
  try {
    let post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    return res.status(200).json({
      success: true,
      post, // Include the post object in the response
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});
// admin Routers
// save posts
router.post("/vehicle/save", async (req, res) => {
  try {
    let newPost = new Vehicles(req.body);
    await newPost.save();
    return res.status(200).json({
      success: "Posts saved successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// get posts
router.get("/vehicles", async (req, res) => {
  try {
    const vehicles = await Vehicles.find({});
    res.status(200).json({
      success: true,
      existingVehicles: vehicles,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

// update routers
router.put("/vehicle/update/:id", async (req, res) => {
  try {
    const post = await Vehicles.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: "Updated successfully",
      updatedPost: post,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// delete post
router.delete("/vehicle/delete/:id", async (req, res) => {
  try {
    const deletedPost = await Vehicles.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Delete successful",
      deletedPost: deletedPost,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Delete unsuccessful",
      error: err.message,
    });
  }
});

//get a specific post

// get a specific post
router.get("/vehicle/:id", async (req, res) => {
  let vehicleId = req.params.id;
  try {
    let vehicle = await Vehicles.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }
    return res.status(200).json({
      success: true,
      vehicle,
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
