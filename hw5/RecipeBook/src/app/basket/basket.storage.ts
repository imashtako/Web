import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Ingredient} from "../recipe/ingredients";

@Injectable({ providedIn: 'root' })
export class BasketStorageService {
  private dataSubject: BehaviorSubject<Ingredient[]> = new BehaviorSubject(new Array<Ingredient>());
  data$: Observable<Ingredient[]> = this.dataSubject.asObservable();

  get value(): Ingredient[] {
    return this.dataSubject.value;
  }

  setData(newValue: Ingredient[]) {
    this.dataSubject.next(newValue);
  }

  addIngredient(ingredient: Ingredient){
    const newValue = this.value.slice();
    for(let i in newValue){
      if(newValue[i].name == ingredient.name){
        newValue[i] = newValue[i].copy();
        newValue[i].count += ingredient.count;
        this.setData(newValue);
        return;
      }
    }
    newValue.push(ingredient);
    this.setData(newValue);
  }

  setCountOfIngredient(name: string, countString: string) {
    const count = parseInt(countString);
    const newValue = this.value.slice();
    for(let i in newValue){
      if(newValue[i].name == name){
        newValue[i] = newValue[i].copy();
        newValue[i].count = count;
        this.setData(newValue);
        return;
      }
    }
  }
}
