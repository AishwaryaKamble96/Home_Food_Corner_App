import dbConnect from "../../../db/connect";
import User from "../../../db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method == "GET") {
    const user = await User.find();
    response.status(200).json(user);
  }
}
