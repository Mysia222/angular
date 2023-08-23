// src/data-sources/recipeData.js
// const Recipe = require('../models/recipe');

// const recipesData = [
//   new Recipe('1', 'First Recipe', 'This is the first recipe'),
//   new Recipe('2', 'Second Recipe', 'This is the second recipe'),
//   new Recipe('3', 'Third Recipe', 'This is the third recipe'),
// ];

const recipesData = [
    {
        id: '1',
        name: 'Chocolate Cake',
        description: 'Delicious chocolate cake recipe',
        ingredients: ['Flour', 'Cocoa', 'Sugar', 'Eggs', 'Milk', 'Butter'],
        instructions: [
          'Preheat oven to 350°F (175°C).',
          'Mix flour, cocoa, and sugar in a bowl.',
          'Add eggs, milk, and melted butter. Mix well.',
          'Pour into a greased baking pan.',
          'Bake for 30 minutes or until a toothpick comes out clean.',
        ],
      },
//   new Recipe('1', 'First Recipe', 'This is the first recipe'),
//   new Recipe('2', 'Second Recipe', 'This is the second recipe'),
//   new Recipe('3', 'Third Recipe', 'This is the third recipe'),
];

// {
//     "title": "Chicken Parmesan",
//   "description": "Breaded chicken topped with tomato sauce and cheese",
//   "imageUrl": {
//     "filename": "image1.jpg",
//     "mimetype": "image/jpeg",
//     "encoding": "7bit'",
//   },
//   "ingredients": [
//     {  "title": "Chicken breasts", "quantity": 2, "unit": "dd" },
//     {  "title": "Breadcrumbs", "quantity": 1, "unit": "cup" },
//     {  "title": "Eggs", "quantity": 2, "unit": "gg" },
//     { "title": "Tomato sauce", "quantity": 1, "unit": "cup" },
//     {  "title": "Mozzarella cheese", "quantity": 200, "unit": "g" },
//     {  "title": "Parmesan cheese", "quantity": 50, "unit": "g" },
//     { "title": "Salt", "quantity": 1, "unit": "tsp" },
//     {  "title": "Black pepper", "quantity": 1, "unit": "tsp" },
//   ],
//   "instructions": "..."
// }
module.exports = { recipesData };