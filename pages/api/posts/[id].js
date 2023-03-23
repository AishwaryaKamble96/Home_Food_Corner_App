import dbConnect from "../../../db/connect";
import Post from "../../../db/models/Post";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const post = await Post.findById(id);
    if (!post) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(post);
  }

  if (request.method === "PUT") {
    const post = await Post.findByIdAndUpdate(id, { $set: request.body });
    console.log("post update", post);
    return response.status(200).json(post);
  }

  if (request.method === "DELETE") {
    const post = await Post.findByIdAndDelete(id);
    return response.status(200).json({ status: "post successfully deleted." });
  }
}
