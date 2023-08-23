import { Injectable } from '@angular/core';
import { Ingredient, IngredientName } from '../../interfaces';
import {
    ADD_INGREDIENT,
  ADD_RECIPE,
  GET_INGREDIENTS,
  GET_RECIPES,
  UPLOAD_FILE,
} from '../../graphql/graphql.queries';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private ingredients: Ingredient[] = [];

  constructor(private apollo: Apollo) {
  }

  getIngredients(): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_INGREDIENTS,
    }).valueChanges;
  }

  getIngredientById(id: number) {
    return this.ingredients.find((ingredient) => ingredient.id === id);
  }

  addIngredient(ingredient: IngredientName): Observable<any> {
    return this.apollo.mutate({
      mutation: ADD_INGREDIENT,
      variables: {
        title: ingredient.title,
        description: ingredient.description
      },
      refetchQueries: [
        {
          query: GET_INGREDIENTS,
        },
      ],
    });
  }

  updateIngredient(ingredient: Ingredient): void {
    const index = this.ingredients.findIndex((r) => r.id === ingredient.id);
    if (index !== -1) {
      this.ingredients[index] = ingredient;
    }
  }

  deleteIngredient(id: number): void {
    const index = this.ingredients.findIndex(
      (ingredient) => ingredient.id === id
    );
    if (index !== -1) {
      this.ingredients.splice(index, 1);
    }
  }
}
