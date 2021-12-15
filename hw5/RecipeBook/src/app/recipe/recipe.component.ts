import {Component, Input} from '@angular/core';
import Recipe from "./recipe";
import {BasketStorageService} from "../basket/basket.storage";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent{
  @Input() recipe: Recipe | null = null;
  constructor(public storage: BasketStorageService) {};

  addIngredientsToBasket(){
    if(this.recipe === null){
      return;
    }

    for(let ingredient of this.recipe.ingredients){
      this.storage.addIngredient(ingredient);
    }

  }
}
