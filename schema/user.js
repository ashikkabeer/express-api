const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  department: {
    type: String,
    required: true,
    enum: [
      "Computer Science & Engineering",
      "Electrical and Electronics Engineering",
      "Electronics and Communications Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
    ],
  },
  batch: {
    type: Number,
    required: false,
    optional: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  role: {
    type: String,
    enum: ["faculty", "student", "admin"],
    default: "student",
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  totalPosts: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model("User", userSchema);
module.exports = {
  User,
};
