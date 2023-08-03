import { Injectable } from '@angular/core';
import { Recipe, IngredientName, Ingredient } from '../interfaces';
import {
  ADD_RECIPE,
  GET_INGREDIENTS,
  GET_RECIPES,
  UPLOAD_FILE,
} from '../graphql/graphql.queries';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [];
  private ingredients: Ingredient[] = [];

  constructor(private apollo: Apollo) {
    this.generateMockRecipes();
    this.generateMockIngredients();
  }

  getRecipes(): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_RECIPES,
    }).valueChanges;
  }

  getIngredients(): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_INGREDIENTS,
    }).valueChanges;
  }

  getRecipeById(id: number) {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  addRecipe(recipe: Recipe): Observable<any> {
    return this.apollo.mutate({
      mutation: ADD_RECIPE,
      variables: {
        title: recipe.title,
        description: recipe.description,
        instructions: recipe.instructions,
        ingredients: recipe.ingredients,
        imageUrl: recipe.imageUrl,
      },
      refetchQueries: [
        {
          query: GET_RECIPES,
        },
      ],
    });
  }

  uploadFile(file: any): Observable<any> {
    return this.apollo.mutate({
      mutation: UPLOAD_FILE,
      variables: {
        file: file,
      },
      context: {
        useMultipart: true // Needed to support multipart upload. 
      },
      refetchQueries: [
        {
          query: GET_RECIPES,
        },
      ],
    });
  }
  updateRecipe(recipe: Recipe): void {
    const index = this.recipes.findIndex((r) => r.id === recipe.id);
    if (index !== -1) {
      this.recipes[index] = recipe;
    }
  }

  deleteRecipe(id: number): void {
    const index = this.recipes.findIndex((recipe) => recipe.id === id);
    if (index !== -1) {
      this.recipes.splice(index, 1);
    }
  }

  private generateMockIngredients(): void {
    const ingredients: Ingredient[] = [
      { id: '1', title: 'Spaghetti', quantity: 0, unit: '' },
      { id: '2', title: 'Bacon', quantity: 0, unit: '' },
      { id: '3', title: 'Eggs', quantity: 0, unit: '' },
      { id: '4', title: 'Parmesan cheese', quantity: 0, unit: '' },
      { id: '5', title: 'Black pepper', quantity: 0, unit: '' },
      { id: '6', title: 'Salt', quantity: 0, unit: '' },
    ];

    // Add the mock recipes to the recipes array
    this.ingredients = ingredients;
  }

  private generateMockRecipes(): void {
    const recipe1: Recipe = {
      id: 1,
      title: 'Pasta Carbonara',
      description: 'Classic Italian pasta dish',
      imageUrl: '../assets/recipe/carbonara.jpg',
      ingredients: [
        { id: '1', title: 'Spaghetti', quantity: 200, unit: 'g' },
        { id: '2', title: 'Bacon', quantity: 100, unit: 'g' },
        { id: '3', title: 'Eggs', quantity: 2, unit: '' },
        { id: '4', title: 'Parmesan cheese', quantity: 50, unit: 'g' },
        { id: '5', title: 'Black pepper', quantity: 1, unit: 'tsp' },
        { id: '6', title: 'Salt', quantity: 1, unit: 'tsp' },
      ],
      instructions: '...',
    };

    const recipe2: Recipe = {
      id: 2,
      title: 'Chicken Parmesan',
      description: 'Breaded chicken topped with tomato sauce and cheese',
      imageUrl: '../assets/recipe/kitchen.jpg',
      ingredients: [
        { id: '7', title: 'Chicken breasts', quantity: 2, unit: '' },
        { id: '8', title: 'Breadcrumbs', quantity: 1, unit: 'cup' },
        { id: '3', title: 'Eggs', quantity: 2, unit: '' },
        { id: '9', title: 'Tomato sauce', quantity: 1, unit: 'cup' },
        { id: '10', title: 'Mozzarella cheese', quantity: 200, unit: 'g' },
        { id: '4', title: 'Parmesan cheese', quantity: 50, unit: 'g' },
        { id: '6', title: 'Salt', quantity: 1, unit: 'tsp' },
        { id: '5', title: 'Black pepper', quantity: 1, unit: 'tsp' },
      ],
      instructions: '...',
    };

    // Add the mock recipes to the recipes array
    this.recipes.push(recipe1, recipe2);
  }
}
