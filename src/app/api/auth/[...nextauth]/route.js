import clientPromise from "@/libs/MongoDbClient";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  secret:'123bdsaaa'
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }