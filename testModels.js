import mongoose from "mongoose";
import "dotenv/config";
import User from "./models/User.js";
import Profile from "./models/Profile.js";
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

const testModels = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    // 1. User
    const user = new User({
      name: "Roman Test",
      email: `roman-${Date.now()}@example.com`,
      password: "TestPassword123",
    });

    await user.validate();
    console.log("User model: OK");

    // 2. Profile
    const profile = new Profile({
      bio: "Test profile",
      city: "Wuppertal",
      country: "Germany",
      user: user._id,
    });

    await profile.validate();
    console.log("Profile model: OK");

    // 3. Post
    const post = new Post({
      title: "Test post",
      content: "This is a test post with enough content.",
      tags: ["JavaScript", "Node.js"],
      author: user._id,
    });

    await post.validate();
    console.log("Post model: OK");

    // 4. Comment
    const comment = new Comment({
      text: "This is a test comment",
      post: post._id,
      author: user._id,
    });

    await comment.validate();
    console.log("Comment model: OK");

    // 5. Product
    const product = new Product({
      name: "Test Product",
      description: "A product for testing",
      price: 19.99,
      sku: `TEST-${Date.now()}`,
    });

    await product.validate();
    console.log("Product model: OK");

    // 6. Order
    const order = new Order({
      user: user._id,
      items: [
        {
          product: product._id,
          quantity: 2,
          priceAtPurchase: 19.99,
        },
      ],
      total: 39.98,
      shippingAddress: {
        city: "Wuppertal",
        street: "Teststraße 1",
        zip: "42103",
      },
    });

    await order.validate();
    console.log("Order model: OK");

    console.log("\nAll models passed validation!");
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await mongoose.disconnect();
  }
};

testModels();
