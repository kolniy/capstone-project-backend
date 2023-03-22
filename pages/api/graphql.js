import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import micro_cors from "micro-cors";
import { typeDefs } from "./schema";
import { getUserIdFromAuthHeader } from "../../utilities/getUserIdFromAuthHeader";
import { PrismaClient } from "@prisma/client";
import * as Query from "./resolver/Query";
import * as Mutation from "./resolver/Mutation";
import { project } from "./resolver/Profile";

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
  Profile: {
    project: project,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId:
        req && req.headers.authorization ? getUserIdFromAuthHeader(req) : null,
    };
  },
  playground: true,
  introspection: true,
  cors: {
    origin: "*",
    methods: "GET,HEAD,POST",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
});

const cors = micro_cors({
  origin: "*",
  allowMethods: ["GET", "POST"],
  allowHeaders: [
    "Access-Control-Allow-Credentials",
    "true",
    "Content-Type",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Headers",
  ],
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
