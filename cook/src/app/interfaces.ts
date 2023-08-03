export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string;
  imageUrl?: any;
}

export interface Ingredient {
  id: string;
  title: string;
  quantity: number;
  unit: string;
}

export interface IngredientName {
  name: string;
}

export class Gallery {
  // tslint:disable-next-line:variable-name
  _id: string;
  imageUrl: string;
  imageTitle: string;
  imageDesc: string;
  uploaded: Date;
}
