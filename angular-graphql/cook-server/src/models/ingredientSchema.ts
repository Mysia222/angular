import mongoose from 'mongoose';

const IngredientsSchema = new mongoose.Schema({
    title: String,
    description: String
})

export default mongoose.model('ingredients', IngredientsSchema);