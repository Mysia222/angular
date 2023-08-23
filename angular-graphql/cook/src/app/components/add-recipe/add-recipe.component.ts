import { Component } from '@angular/core';
import { Ingredient } from '../../interfaces';
import { RecipeService } from '../../services/recipe/recipe.service';
import { Observable, map, startWith } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Apollo, ApolloBase } from 'apollo-angular';
import { Router } from '@angular/router';
import { GalleryService } from '../../services/gallery/gallery.service';
import { AddNewIngredientComponent } from '../add-new-ingredient/add-new-ingredient.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogConfig,
} from '@angular/material/dialog';
import { IngredientService } from '../../services/ingredient/ingredient.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent {
  title: string;
  description: string;
  selectedIngredients: any;
  allIngredients: any;
  ingredients: any;
  form: FormGroup;
  submitted = false;
  preview: string;
  error: any;
  recipes: any;
  isModelOpen: boolean = false;

  myControl = new FormControl<any>([]);

  //   deleteRecipe(id: string) {
  //     // apollo graphql query to delete recipe
  //     this.apollo
  //       .mutate({
  //         mutation: DELETE_RECIPE,
  //         variables: {
  //           id: id,
  //         },
  //         refetchQueries: [
  //           {
  //             query: GET_RECIPES,
  //           },
  //         ],
  //       })
  //       .subscribe(
  //         ({ data }: any) => {
  //           this.recipes = data.deleteRecipe;
  //         },
  //         (error) => {
  //           this.error = error;
  //         }
  //       );
  //   }

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private galleryService: GalleryService,
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    public dialog: MatDialog
  ) {}
  //   this.ingredients = data.data.ingredients.map((el: any) => {
  //     return { quantity: '', unit: '', id: el.id };
  //   });
  ngOnInit() {
    this.ingredientService.getIngredients().subscribe((data: any) => {
      this.allIngredients = data.data.ingredients;
    });
    this.recipeService.getRecipes().subscribe((data: any) => {
      this.recipes = data.data.recipes;
    });
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      instructions: ['', Validators.required],
      ingredients: [[]],
      imageUrl: ['', []],
      image: [null, Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }
  openModel(): void {
    this.isModelOpen = true;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners',
    };

    const dialogRef = this.dialog.open(AddNewIngredientComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      console.log('Dialog output:', data);
      this.ingredientService.getIngredients().subscribe((data: any) => {
        this.allIngredients = data.data.ingredients;
      });
    });
  }
  changeIngredients(event: any, ingredient?: any): void {
    let newIngredients = ingredient
      ? this.form.value.ingredients.map((el: any) => {
          const valueProp =
            event.target?.name === 'quantity' ? 'valueAsNumber' : 'value';
          if (el.id === ingredient.id) {
            return { ...el, [event.target?.name]: event.target[valueProp] };
          }
          return el;
        })
      : event.value.map((el: any) => {
          return {
            quantity: this.getCurrentIngredient(el.id)?.quantity || 0,
            unit: this.getCurrentIngredient(el.id)?.unit || '',
            id: el.id,
          };
        });
    this.form.patchValue({
      ingredients: newIngredients,
    });
  }

  getCurrentIngredient(id: string) {
    return this.form.value.ingredients.filter((el: any) => el.id === id)[0];
  }

  getTitle(ingredient: any) {
    return this.allIngredients.filter((el: any) => el.id === ingredient.id)[0]
      .title;
  }

  isIngredientShow(ingredient: string): boolean {
    return (
      this.form.value.ingredients.length !== 0 &&
      this.form.value.ingredients &&
      this.form.value.ingredients.filter((el: any) => el === ingredient)
        .length > 0
    );
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({
      image: file,
    });

    // File Preview
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  selectIngredients(event: any) {
    this.selectedIngredients = event.value;
  }

  submitForm() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.galleryService.addGallery(this.form.value.image).then(
      (res: any) => {
        if (res) {
          this.recipeService
            .addRecipe({ ...this.form.value, imageUrl: res.imageId })
            .subscribe(
              (data: any) => {
                this.form.reset();
                this.router.navigate(['/']);
              },
              (error) => {
                this.error = error;
              }
            );
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
