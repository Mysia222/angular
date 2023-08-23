export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string;
  imageUrl?: any;
}

export interface Ingredient {
  id: number;
  title: string;
  quantity: number;
  unit: string;
}

export interface IngredientName {
  title: string;
  description: string;
}

export class Gallery {
  // tslint:disable-next-line:variable-name
  _id: string;
  imageUrl: string;
  imageTitle: string;
  imageDesc: string;
  uploaded: Date;
}
