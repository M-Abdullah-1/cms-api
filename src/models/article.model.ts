import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, "An article must have heading!"],
    },
    description: {
      type: String,
      required: [true, "An article must have description!"],
    },
    articlePic: {
      type: String,
    },
    category: {
      type: String,
      enum: ["tech", "sport", "IT", "travel"],
      required: [true, "An article must have category."],
    },
    comment: [
      {
        text: {
          type: String,
          require: [true, "Comment must have some text in it."],
        },
        date: {
          type: Date,
          default: Date.now,
        },
        like: {
          type: Number,
          default: 0,
        },
        dislike: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const articleModel = mongoose.model("article", articleSchema);

export default articleModel;
