import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { merge } from 'lodash';
import { Recipe } from './graphql/modules/recipe/recipe.schema';

import ingredientResolvers from './graphql/modules/ingredient/ingredient.resolvers';
import { Ingredient } from './graphql/modules/ingredient/ingredient.schema';
import mongoose from 'mongoose';
import recipeResolvers from './graphql/modules/recipe/recipe.resolvers';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { createUploadLink } from 'apollo-upload-client';
import fileUpload from 'express-fileupload';
import galleryRouter from './routers/gallery';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

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
        typeDefs: [Recipe, Ingredient],
        resolvers: merge(ingredientResolvers, recipeResolvers),
        csrfPrevention: true,
        cache: 'bounded',
        context: (req) => ({ ...req }),
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    });
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    //app.use(cookieParser());
    // app.use(express.static(join(__dirname, 'public')));
    app.use(cors());
    app.use('/gallery', galleryRouter);
    server.start().then((res: any) => {
        server.applyMiddleware({ app });
        const PORT = 3000;
        app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
    });
}

startServer();

// async function startServer() {
//     const server = new ApolloServer({
//         typeDefs: [Recipe, Ingredient],
//         resolvers: merge(ingredientResolvers, recipeResolvers),
//         csrfPrevention: true,
//         cache: 'bounded',
//         context: (req) => ({ ...req }),
//         plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
//     });
//     const app = express();

//     app.use(express.json());
//     app.use(express.urlencoded({ extended: false }));
//     //app.use(cookieParser());
//     app.use(express.static(join(__dirname, 'public')));
//     app.use(cors());
//     app.use('/gallery', galleryRouter);
//     const PORT = 4000;
//     app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
// }

// startServer();
