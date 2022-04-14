"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("./resolvers/User");
const Product_1 = require("./resolvers/Product");
const Categories_1 = require("./resolvers/Categories");
const Cart_1 = require("./resolvers/Cart");
const Order_1 = require("./resolvers/Order");
dotenv_1.default.config();
const main = async () => {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [
            Categories_1.CategoriesResolver,
            Product_1.ProductResolver,
            User_1.UserResolver,
            Cart_1.CartResolver,
            Order_1.OrderResolver,
        ],
        emitSchemaFile: true,
        validate: false,
    });
    // create mongoose connection
    const mongoose = await (0, mongoose_1.connect)(process.env.MONGO_URI);
    await mongoose.connection;
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        plugins: [apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground],
    });
    const app = (0, express_1.default)();
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    app.listen({ port: 3333 }, () => console.log(`🚀 Server ready and listening at ==> http://localhost:3333${apolloServer.graphqlPath}`));
};
main().catch((error) => {
    console.log(error, "error");
});
