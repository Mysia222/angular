//import { GraphQLUpload } from 'graphql-upload';
// import GraphQLUpload from 'graphql-upload';
// import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import Recipe from '../../../models/recipeSchema';
import { join, parse } from 'path';
import fs from 'fs';
import { createWriteStream } from 'fs';
import { finished } from 'stream/promises';

const BASE_URL = `http://localhost:3000`;
// GraphQL Resolvers
const recipeResolvers = {
    Query: {
        recipes: async () => await Recipe.find({}), // return array of students
        getRecipe: async (parent: any, args: { id: any }) => await Recipe.findById(args.id), // return student by id
    },
    Mutation: {
        imageUploader: async (_: any, { file }: any) => {
            const { filename, createReadStream } = await file;
            console.log(file);
            let stream = createReadStream();
            console.log(stream);
            let { ext, name } = parse(filename);

            name = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_');

            let serverFile = join(__dirname, `../../uploads/${name}-${Date.now()}${ext}`);

            serverFile = serverFile.replace(' ', '_');

            let writeStream = await createWriteStream(serverFile);

            await stream.pipe(writeStream);

            serverFile = `${BASE_URL}${serverFile.split('uploads')[1]}`;

            return serverFile;
        },
        createRecipe: async (parent: any, args: any) => {
            let recipe = new Recipe({
                title: args.title,
                description: args.description,
                ingredients: args.ingredients,
                instructions: args.instructions,
                imageUrl: args.imageUrl,
            });
            await recipe.save();
            return recipe;
        },
        updateRecipe: async (parent: any, args: { id: any }) => {
            const { id } = args;
            const updatedRecipe = await Recipe.findByIdAndUpdate(id, args);
            if (!updatedRecipe) {
                throw new Error(`Recipe with ID ${id} not found`);
            }
            return updatedRecipe;
        },
        deleteRecipe: async (parent: any, args: { id: any }) => {
            const { id } = args;
            const deletedStudent = await Recipe.findByIdAndDelete(id);
            if (!deletedStudent) {
                throw new Error(`Recipe with ID ${id} not found`);
            }
            return deletedStudent;
        },
    },
};

export default recipeResolvers;
