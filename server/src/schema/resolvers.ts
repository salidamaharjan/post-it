import dotenv from "dotenv";
dotenv.config();
import Post from "../model/post";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import { MyContext } from "../auth";

type NewPost = {
  postName: String;
};
export const resolvers = {
  Query: {
    posts: async () => {
      const posts = await Post.findAll();
      const post = posts.map((post) => {
        return post.toJSON();
      });
      console.log(post);
      return post;
    },
  },
  Mutation: {
    newPost: async (_: any, args: { post: NewPost }, context: MyContext) => {
      const newPost = await Post.create(args.post);
      return newPost.toJSON();
    },
    login: async (
      _: any,
      args: { username: String; password: String },
      __: any
    ) => {
      if (args.username !== "adminu") {
        throw new GraphQLError(
          "You are not authorized to perform this action.",
          {
            extensions: { code: "Forbidden" },
          }
        );
      } else {
        const token = jwt.sign(
          {
            username: "adminu",
          },
          process.env.JWT_SECRET_KEY!,
          { expiresIn: "1h" }
        );
        return token;
      }
    },
  },
};
