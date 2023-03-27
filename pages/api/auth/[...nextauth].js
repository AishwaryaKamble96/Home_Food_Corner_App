import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../db/connectAuth";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
