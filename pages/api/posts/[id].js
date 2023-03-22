import dbConnect from "../../../db/connect";
import Post from "../../../db/models/Post";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "PUT") {
    const product = await Post.findByIdAndUpdate(id, { $set: request.body });
    console.log(product);
    return response.status(200).json(product);
  }

  if (request.method === "DELETE") {
    const post = await Post.findByIdAndDelete(id);
    return response.status(200).json({ status: "post successfully deleted." });
  }
}
