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
});

const authorModel = mongoose.model("author", authorSchema);

export default authorModel;
