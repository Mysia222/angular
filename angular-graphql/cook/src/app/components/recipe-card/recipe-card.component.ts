import { Component, Input } from '@angular/core';
import { Recipe } from '../../interfaces';
import { GalleryService } from '../../services/gallery/gallery.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() recipe: Recipe;
  recipes: Recipe[] = [];
  img: any;
  constructor(private galleryService: GalleryService) {
  }

  ngOnInit(){
    this.galleryService.getImage(this.recipe.imageUrl).then((res: any) => {
        console.log(res);
        this.img = res;
    });
  }
}
