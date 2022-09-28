import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../database/dbConnect";

const UserSchema = require("../../../models/UserModel");
const bcrypt = require("bcrypt");

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      firstName?: string;
    } & DefaultSession["user"];
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        await dbConnect();
        const user = await UserSchema.findOne({
          email: credentials!.email,
        });
        if (!user) {
          return null;
        }
        const isPasswordValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isPasswordValid) {
          return null;
        }
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token._id = user._id;
        token.firstName = user.firstName;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token
      }
    
      return session
    },
    
  },
  jwt: {
    secret: "SecretHBOClone",
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60,
  },
  pages: {
    signIn: "/auth/signin"
  }
});
