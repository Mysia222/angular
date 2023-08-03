import Ingredient from '../../../models/ingredientSchema';

// GraphQL Resolvers
const ingredientResolvers = {
    Query: {
        ingredients: async () => await Ingredient.find({}), // return array of students
        getIngredient: async (parent: any, args: { id: any }) => await Ingredient.findById(args.id), // return student by id
    },
    Mutation: {
        createIngredient: async (parent: any, args: any) => {
            let ingredient = new Ingredient({
                title: args.title,
                description: args.description,
            });
            await ingredient.save();
            return ingredient;
        },
    },
};

export default ingredientResolvers;
