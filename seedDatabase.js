import "dotenv/config";
import mongoose from "mongoose";

import User from "./models/User.js";
import Profile from "./models/Profile.js";
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    const user = await User.create({
      name: "Roman Test",
      email: `roman-${Date.now()}@example.com`,
      password: "TestPassword123",
    });

    const profile = await Profile.create({
      bio: "Test profile for MongoDB practice",
      city: "Wuppertal",
      country: "Germany",
      user: user._id,
    });

    const post = await Post.create({
      title: "My First Post",
      content: "This is a test post for MongoDB practice.",
      tags: ["mongodb", "javascript"],
      author: user._id,
    });

    const comment = await Comment.create({
      text: "This is a test comment.",
      post: post._id,
      author: user._id,
    });

    const product = await Product.create({
      name: "Test Product",
      description: "A product for testing MongoDB models.",
      price: 19.99,
      stock: 10,
      sku: `TEST-${Date.now()}`,
      category: "other",
    });

    const order = await Order.create({
      user: user._id,
      items: [
        {
          product: product._id,
          quantity: 2,
          priceAtPurchase: 19.99,
        },
      ],
      status: "pending",
      total: 39.98,
      shippingAddress: {
        city: "Wuppertal",
        street: "Teststraße 1",
        zip: "42103",
      },
    });

    console.log("All test documents created!");
    console.log({
      userId: user._id,
      profileId: profile._id,
      postId: post._id,
      commentId: comment._id,
      productId: product._id,
      orderId: order._id,
    });
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();