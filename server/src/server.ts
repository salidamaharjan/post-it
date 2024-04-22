//import express to setup express app.
import express, { Express, Request, Response } from "express";

//import dotenv to setup environment variables.
import dotenv from "dotenv";
//use the environment variable during app setup.
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";

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
    expressMiddleware(server)
  );
  //express app is awaiting request at http://localhost:3000 port
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    console.log(`Apollo Server running at http://localhost:${port}/graphql`);
  });
})();
