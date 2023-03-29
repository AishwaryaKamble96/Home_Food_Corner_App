import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
  review: { type: String, required: true },
  userId: { type: String, required: true },
  postId: { type: String, required: true },
  reviewDate: { type: String, required: true },
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
export default Review;
