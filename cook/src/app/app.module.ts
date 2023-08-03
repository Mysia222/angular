import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { SquareComponent } from './square/square.component';
import { BoardComponent } from './board/board.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { MatChipsModule } from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, SquareComponent, BoardComponent, RecipeCardComponent, RecipeListComponent, HeaderComponent, FooterComponent, ContentComponent, SidebarComponent, AddRecipeComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    AppRoutingModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatRadioModule,
    MatChipsModule,
    MatSelectModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    NoopAnimationsModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
