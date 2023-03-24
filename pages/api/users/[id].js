import dbConnect from "../../../db/connect";
import User from "../../../db/models/User";
import { getSession } from "next-auth/react";

export default async function handler(request, response) {
  await dbConnect();

  const session = await getSession({ request });

  console.log("session", session);
  if (request.method == "GET") {
    const user = await User.findById(session.user.id);
    if (!user) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(user);
  }

  if (request.method === "PATCH") {
    const updateUser = await User.findByIdAndUpdate(session.user.id, {
      $set: request.body,
    });
    response.status(200).json(updateUser);
  }
}
