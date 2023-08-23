import { gql } from 'apollo-angular';

const GET_RECIPES = gql`
  query Recipes {
    recipes {
      id
      title
      description
      ingredients {
        unit
        quantity
        _id
        id
      }
      instructions
      imageUrl
    }
  }
`;

const ADD_RECIPE = gql`
  mutation Mutation(
    $imageUrl: String
    $ingredients: [RecipeIngredientInput!]!
    $title: String!
    $instructions: String
    $description: String
  ) {
    createRecipe(
      imageUrl: $imageUrl
      ingredients: $ingredients
      title: $title
      instructions: $instructions
      description: $description
    ) {
      title
      description
      ingredients {
        unit
        quantity
        _id
      }
      instructions
      imageUrl
      id
    }
  }
`;

const CREATE_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      username
      email
    }
  }
`;

const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation imageUploader($file: Upload!) {
    imageUploader(file: $file)
  }
`;

const ADD_INGREDIENT = gql`
  mutation CreateIngredient($title: String!, $description: String) {
    createIngredient(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

const GET_INGREDIENTS = gql`
  query Query {
    ingredients {
      description
      title
      id
    }
  }
`;

const DELETE_RECIPE = gql`
  mutation deleteRecipe($id: Int!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

export {
  GET_RECIPES,
  ADD_RECIPE,
  DELETE_RECIPE,
  ADD_INGREDIENT,
  GET_INGREDIENTS,
  UPLOAD_FILE,
  CREATE_USER,
  LOGIN_USER,
};
