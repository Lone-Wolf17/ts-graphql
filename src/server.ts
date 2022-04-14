import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";
import dotenv from "dotenv";

import { UserResolver } from "./resolvers/User";
import { ProductResolver } from "./resolvers/Product";
import { CategoriesResolver } from "./resolvers/Categories";
import { CartResolver } from "./resolvers/Cart";
import { OrderResolver } from "./resolvers/Order";

dotenv.config();

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      CategoriesResolver,
      ProductResolver,
      UserResolver,
      CartResolver,
      OrderResolver,
    ],
    emitSchemaFile: true,
    validate: false,
  });

  // create mongoose connection
  const mongoose = await connect(process.env.MONGO_URI!);
  await mongoose.connection;

  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  const app = Express();
  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen({ port: 3333 }, () =>
    console.log(
      `🚀 Server ready and listening at ==> http://localhost:3333${apolloServer.graphqlPath}`
    )
  );
};

main().catch((error) => {
  console.log(error, "error");
});
