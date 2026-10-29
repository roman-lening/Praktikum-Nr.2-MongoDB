import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    avatarUrl: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    city: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    country: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    birthdate: {
      type: Date,
      validate: {
        validator: function (value) {
          return !value || value <= new Date();
        },
      },
    },
    website: {
      type: String,
      trim: true,
    },
    socials: {
      telegram: {
        type: String,
        trim: true,
      },
      github: {
        type: String,
        trim: true,
      },
      linkedin: {
        type: String,
        trim: true,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
