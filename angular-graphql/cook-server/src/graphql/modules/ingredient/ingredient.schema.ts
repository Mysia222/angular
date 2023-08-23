import { gql } from 'apollo-server-express';

export const Ingredient = gql`
    type Ingredient {
        id: ID
        title: String
        description: String
    }
    type Query {
        ingredients: [Ingredient]
        getIngredient(id: ID!): Ingredient
    }
    type Mutation {
        createIngredient(title: String!, description: String): Ingredient
    }
`;
