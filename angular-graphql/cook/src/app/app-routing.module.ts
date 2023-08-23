import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { SingupComponent } from './components/singup/singup.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { SignupSuccessComponent } from './components/signup-success/signup-success.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: RecipeListComponent },
    { path: 'add', component: AddRecipeComponent },
    { path: 'signup', component: SingupComponent },
    { path: 'signup-success', component: SignupSuccessComponent },
    { path: 'login', component:  LoginComponent},
    // Add more routes as needed
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
