import { gql } from 'apollo-server-express';

export const User = gql`
    scalar ObjectID
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
    }
    type Role {
        roles: [String]!
    }
    type UserPref {
        username: String!
        email: String!
    }
    type UserExists {
        username: String!
        email: String!
    }
    type LoginUser {
        token: String!
    }
    type Token {
        token: String!
    }
    type Query {
        getUser: UserExists
        checkUserExists(email: String!): UserExists
    }
    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        loginUser(email: String!, password: String!): LoginUser
        updateUser(username: String!, email: String!, password: String!): UserPref
        updateUserAdmin(id: String!, roles: [String!]!): Role
    }
`;
// https://www.telerik.com/blogs/firebase-authentication-using-custom-token