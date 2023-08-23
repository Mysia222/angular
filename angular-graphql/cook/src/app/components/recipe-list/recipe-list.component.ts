import { Recipe } from '../../interfaces';
import { RecipeService } from '../../services/recipe/recipe.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { Apollo } from 'apollo-angular';
import { GET_RECIPES } from '../../graphql/graphql.queries';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent {
  recipes: Recipe[] = [];
  error: any;
  constructor(private recipeService: RecipeService, private apollo: Apollo) {
  }
  myControl = new FormControl<string | Recipe>('');
  filteredRecipes: Observable<Recipe[]>;

  gridColumns = 3;
           
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }


  ngOnInit() {
    this.recipeService.getRecipes().subscribe(({ data, error }: any) => {
      this.recipes = data.recipes;
      this.error = error;
      this.filteredRecipes = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.title;
          return name ? this._filter(name as string) : this.recipes.slice();
        })
      );
    });
}

  onSelectionChange(event: { option: { value: any; }; }){
    const recipe = event.option.value;

    this._filter(recipe.title);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  displayFn(recipe: Recipe): string {
    return recipe && recipe.title ? recipe.title : '';
  }

  private _filter(recipe: string): Recipe[] {
    const filterValue = recipe.toLowerCase();

    return this.recipes.filter((option) =>
      option.title.toLowerCase().includes(filterValue)
    );
  }
}
