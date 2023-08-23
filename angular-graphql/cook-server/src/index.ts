import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { merge } from 'lodash';
import { Recipe } from './graphql/modules/recipe/recipe.schema';

import ingredientResolvers from './graphql/modules/ingredient/ingredient.resolvers';
import { Ingredient } from './graphql/modules/ingredient/ingredient.schema';
import { User } from './graphql/modules/user/user.schema';
import recipeResolvers from './graphql/modules/recipe/recipe.resolvers';
import userResolvers from './graphql/modules/user/user.resolvers';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import galleryRouter from './routers/gallery';
import cors from 'cors';
import mongoose from 'mongoose';
// import { getErrorCode } from './utils/errorHandler';
//import './db/database';

const MONGO_URI = 'mongodb://localhost:27017/cook';

// Database connection
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log(`Db Connected`);
    })
    .catch((err) => {
        console.log(err.message);
    });

async function startServer() {
    const server = new ApolloServer({
        typeDefs: [Recipe, Ingredient, User],
        resolvers: merge(ingredientResolvers, recipeResolvers, userResolvers),
        csrfPrevention: true,
        cache: 'bounded',
        context: (req) => ({ ...req }),
        formatError: (error) => {
            console.error('GraphQL Error:', error.extensions?.code);
            return error;
        },
    });
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use('/gallery', galleryRouter);
    server.start().then((res: any) => {
        server.applyMiddleware({ app });
        const PORT = 3000;
        app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
    });
}

startServer();
