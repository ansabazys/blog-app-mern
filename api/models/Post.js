import { model, Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    desc: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
      required: false,
    },

    categories: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

export default Post;
