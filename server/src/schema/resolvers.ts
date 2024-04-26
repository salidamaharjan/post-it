import dotenv from "dotenv";
dotenv.config();
import { Post, Client } from "../model/index";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
import { MyContext } from "../auth";

type NewPost = {
  postName: String;
};
export const resolvers = {
  Query: {
    posts: async () => {
      let posts = await Post.findAll({ include: Client });
      posts = posts.map((post) => {
        let json = post.toJSON();
        // console.log(json);
        return {
          ...json,
          username: json.client.username,
        };
      });
      // console.log("post", posts);
      return posts;
    },
  },
  Mutation: {
    newPost: async (_: any, args: { post: NewPost }, context: MyContext) => {
      if (!context.clientId) {
        throw new GraphQLError(
          "You are not authorized to perform this action.",
          {
            extensions: { code: "Forbidden" },
          }
        );
      }
      const newPost = await Post.create({
        clientId: context.clientId,
        ...args.post,
      });
      console.log("newPost", newPost.toJSON());
      return { ...newPost.toJSON(), username: context.username };
    },

    updatePost: async (
      _: any,
      args: { postName: string },
      context: MyContext
    ) => {
      let paramValue = args.postName;
      let myReturnValue: string = "";
      return myReturnValue;
    },

    login: async (
      _: any,
      args: { username: string; password: string },
      __: any
    ) => {
      // find a user from the DB which matches the username from frontend
      const client = await Client.findOne({
        where: { username: args.username },
      });
      // convert sequelize model to JSON object
      const clientToJson = client!.toJSON();

      //if client not found in DB will throw an error
      if (!client) {
        throw new GraphQLError(
          "You are not authorized to perform this action.",
          {
            extensions: { code: "Forbidden" },
          }
        );
      }
      // if user password did not match will throw an error
      if (clientToJson.password !== args.password) {
        throw new GraphQLError(
          "You are not authorized to perform this action.",
          {
            extensions: { code: "Forbidden" },
          }
        );
      }
      // creates a token if the username and password found in DB.
      const token = jwt.sign(
        {
          clientId: clientToJson.id,
          username: clientToJson.username,
        },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: "1h" }
      );
      return token;
    },
  },
};
