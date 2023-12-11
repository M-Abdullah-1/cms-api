import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  insta: {
    type: String,
  },
  about: {
    type: String,
  },
  article: [{ type: mongoose.Schema.ObjectId, ref: "Article" }],
});

const authorModel = mongoose.model("Author", authorSchema);

export default authorModel;
