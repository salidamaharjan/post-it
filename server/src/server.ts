//import dotenv to setup environment variables.
import dotenv from "dotenv";
//use the environment variable during app setup.
dotenv.config();

//import express to setup express app.
import express, { Express, Request, Response } from "express";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";
import { sequelize } from "./config/sequelizeConnection";
import Post from "./model/posts";
import { authMiddleware } from "./auth";

//invoke express and assign it to app variable
const app: Express = express();
//use the PORT from .env if not use 3000 as default port and assign it to port variable.
const port = process.env.PORT || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//using get method to send Hello World as response when '/',route is requested.'/' is also known as endpoint or root url.
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

(async () => {
  await server.start();
  // Specify the path where we'd like to mount our server
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, { context: authMiddleware })
  );
  await sequelize.sync({ force: true });
  console.log("All models were synchronized successfully.");
  await Post.create({
    postName: "This is post one",
  });
  await Post.create({
    postName: "This is post two",
  });
  console.log("Post seeded");
  //express app is awaiting request at http://localhost:3000 port
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    console.log(`Apollo Server running at http://localhost:${port}/graphql`);
  });
})();
