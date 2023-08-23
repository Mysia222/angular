import mongoose from 'mongoose';
import { ObjectId } from "mongoose";

const recipeListSchema = new mongoose.Schema({
    title: String,
    description: String,
    ingredients: [{
        ingredient: {type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'},
        quantity: {type: Number, required: false},
        unit: {type: String, required: false}
    }],
    instructions: String,
    imageUrl: Object,
})

export default mongoose.model('recipes', recipeListSchema);