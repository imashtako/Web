import { Component } from '@angular/core';
import {ALL_RECIPES} from "./allRecipes";
import Recipe from "./recipe/recipe";
import {MatDialog} from "@angular/material/dialog";
import {BasketComponent} from "./basket/basket.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "RecipeBook";
  recipes: Recipe[] = ALL_RECIPES;

  sideBarIsOpen: boolean = false;

  selectedRecipe: Recipe = this.recipes[0];

  constructor(public busket: MatDialog){}

  setSideBarIsOpen(state: boolean){
    this.sideBarIsOpen = state;
  }

  selectRecipe(recipe: Recipe){
    this.sideBarIsOpen = false;
    this.selectedRecipe = recipe;
  }

  openBasket(){
    const dialogRef = this.busket.open(BasketComponent);
  }

}
