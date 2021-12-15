import { Component } from '@angular/core';
import {BasketStorageService} from "./basket.storage";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent{
  constructor(public storage: BasketStorageService) { }
  newValue: number = 0;
  buy(){
    alert('Куплено');
  }
}
