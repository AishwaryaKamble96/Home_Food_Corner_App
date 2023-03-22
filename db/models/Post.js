import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  name: { type: String, required: true },
  image_url: { type: String, required: true },
  date_of_post: { type: String },
  date_of_availability: { type: String },
  price: { type: Number, required: true },
  content: { type: String, required: true },
  tag: { type: String, required: true },
  shipping_type: { type: String, required: true },
  location: { type: String, required: true },
  user_id: { type: String, required: true },
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
