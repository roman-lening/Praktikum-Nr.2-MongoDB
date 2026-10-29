import "dotenv/config";
import mongoose from "mongoose";

import User from "./models/User.js";
import Profile from "./models/Profile.js";
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

const models = [User, Profile, Post, Comment, Product, Order];

const createCollections = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    for (const model of models) {
      await model.createCollection();
      console.log(`Collection "${model.collection.name}" created`);
    }

    console.log("All collections created successfully!");
  } catch (error) {
    if (error.code === 48) {
      console.log("Collection already exists");
    } else {
      console.error(error);
    }
  } finally {
    await mongoose.disconnect();
  }
};

createCollections();