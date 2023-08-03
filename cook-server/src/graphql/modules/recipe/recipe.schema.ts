import { gql } from 'apollo-server-express';

export const Recipe = gql`
    scalar ObjectID
    scalar Upload
    type RecipeIngredient {
        id: ID
        _id: ObjectID
        quantity: Int
        unit: String
    }
    input RecipeIngredientInput {
        id: ID!
        quantity: Int
        unit: String
    }

    type Recipe {
        id: ID
        title: String
        description: String
        ingredients: [RecipeIngredient!]!
        instructions: String
        imageUrl: String
    }
    input ImageInput {
        name: String
        type: String
    }

    type File {
        _id: ID!
        filename: String!
        mimetype: String!
        encoding: String!
    }
    type Image {
        id: ID!
        name: String
        type: String
    }
    type Query {
        recipes: [Recipe]
        getRecipe: Recipe
    }
    type Mutation {
        createRecipe(description: String, title: String!, ingredients: [RecipeIngredientInput!]!, instructions: String, imageUrl: String): Recipe
        updateRecipe(
            id: ID!
            title: String!
            description: String
            ingredients: [RecipeIngredientInput!]!
            instructions: String
            imageUrl: String
        ): Recipe
        deleteRecipe(id: ID!): Boolean!
        imageUploader(file: Upload!): String!
    }
`;
