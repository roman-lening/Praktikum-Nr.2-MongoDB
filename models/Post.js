import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10000,
    },

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    tags: {
      type: [
        {
          type: String,
          trim: true,
          lowercase: true,
          maxlength: 30,
        },
      ],
      validate: {
        validator: function (value) {
          return value.length <= 10;
        },
      },
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    comments: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
