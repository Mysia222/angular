import User from '../../../models/userSchema';
import Auth from '../../../utils';
import { addDocument, getCollection, getDocByField } from '../../../db/database';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { handleFirestoreError } from '../../../utils/errorHandler';
import { GraphQLError } from 'graphql';
const BASE_URL = `http://localhost:3000`;
// GraphQL Resolvers
const recipeResolvers = {
    Query: {
        // getUser: async (parent: any, args: any) => {
        //     getUser_R(context, getUser_C)
        // },
        // checkUserExists: (_, args, context) => checkUserExists_R(args, checkUserExists_C), //check if user email already exists, for new user id creation
        // loginUser: (_, args, context) => loginUser_R(args, loginUser_C)
    },
    Mutation: {
        createUser: async (parent: any, args: any) => {
            try {
                const existingUser: any = await getDocByField('users', 'email', args.email);

                if (existingUser.length > 0) {
                    return new GraphQLError('The Email address already exist', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                        },
                    });
                } else {
                    const hashedPwd = await Auth.hashPassword(args.password);
                    const user = {
                        email: args.email,
                        username: args.username,
                        password: hashedPwd,
                    };
                    return await addDocument('users', user);
                }
            } catch (error: any) {
                return new Error(error);
            }

            // const auth = getAuth();
            // createUserWithEmailAndPassword(auth, args.email, hashedPwd);
        },

        loginUser: async (parent: any, { email, password }: any) => {
            // const auth = getAuth();
            // signInWithEmailAndPassword(auth, email, password)
            //     .then((userCredential) => {
            //         console.log('success');
            //     })
            try {
                if (!password || !email) throw new Error('email or username required');
                const existingUser: any = await getDocByField('users', 'email', email);
                if (existingUser.length === 0)
                    return new GraphQLError('Unknown user', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                        },
                    });
                const user = existingUser[0].data();
                const correctPassword = await Auth.matchPasswords(password, user.password);
                if (!correctPassword)
                    return new GraphQLError('Invalid password', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                        },
                    });
                return {
                    token: Auth.generateJwt({
                        userId: user.id,
                        username: user.username,
                        email: user.email,
                    }),
                };
            } catch (error: any) {
                return new Error(error);
            }

            // return {
            //     jwt: Auth.generateJwt({
            //         userId: user.id,
            //         username: user.username,
            //         email: user.email,
            //     }),
            // };
        },
        // updateUser: (_, args, context) => updateUser_R(context,args,updateUser_C), //check jwt token, validate if user is self then update own email & password but NOT the roles
        // updateUserAdmin: (_, args, context) => updateUserAdmin_R(context,args,["admin","owner"],updateUserAdmin_C) //check jwt token, validate if user is admin then update any other user's roles
    },
};

export default recipeResolvers;
