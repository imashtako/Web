import {Ingredient} from "./ingredients";

export default interface Recipe {
  title: string;
  imageSrc: string;
  ingredients: Ingredient[];
  description: string;
}
