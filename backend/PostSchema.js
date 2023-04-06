import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: String,
  content: String,
  image: String,
  time:String,
});

export default mongoose.model("posts", blogSchema);
