import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "../server/schema/type-defs.js";
import { resolvers } from "../server/schema/resolvers.js";
import { connectDB } from "../server/db/connect.js";
import dotenv from "dotenv";

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const start = async () => {
  try {
    // connect to db
    await connectDB(process.env.MONGODB_URI);
    const { url } = await startStandaloneServer(server);

    console.log(`🚀 Server ready at ${url}`);
  } catch (e) {
    console.log(e.message);
  }
};

start();
