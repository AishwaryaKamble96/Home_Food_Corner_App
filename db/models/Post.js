import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  name: String,
  imgUrl: String,
  date_of_post: String,
  date_of_availability: String,
  price: Number,
  content: String,
  tag: String,
  shipping_type: String,
  location: String,
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
