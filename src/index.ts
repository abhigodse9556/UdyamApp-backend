import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server),
  );

  app.listen(4000, () => {
    console.log("Server running on port 4000");
  });
}

startServer();
