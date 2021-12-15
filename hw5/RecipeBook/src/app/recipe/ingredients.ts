import {Unit, Glass, Thing, Spoon, Weight} from './unit';


export abstract class Ingredient {
  readonly name: string;
  count: number;
  private _unit: Unit;


  protected constructor(name: string, count: number, unit: Unit) {
    this.name = name;
    this.count = count;
    this._unit = unit;
  }

  get unit(): string {
    return this._unit.getUnit(this.count);
  }

  abstract copy(): Ingredient;
}


export class Sugar extends Ingredient{
  constructor(count: number){
    super('Сахар', count, new Glass());
  }

  copy(): Sugar{
    return new Sugar(this.count);
  }
}

export class Egg extends Ingredient{
  constructor(count: number){
    super('Яйцо', count, new Thing());
  }

  copy(): Egg{
    return new Egg(this.count);
  }
}

export class Flour extends Ingredient{
  constructor(count: number){
    super('Мука', count, new Glass());
  }

  copy(): Flour{
    return new Flour(this.count);
  }
}

export class Apple extends Ingredient{
  constructor(count: number){
    super('Яблоко', count, new Thing());
  }

  copy(): Apple{
    return new Apple(this.count);
  }
}

export class Oil extends Ingredient{
  constructor(count: number){
    super('Масло', count, new Spoon());
  }

  copy(): Oil{
    return new Oil(this.count);
  }
}

export class BakingPowder extends Ingredient{
  constructor(count: number){
    super('Разрыхлитель', count, new Spoon());
  }

  copy(): BakingPowder{
    return new BakingPowder(this.count);
  }
}

export class CottageCheese extends Ingredient{
  constructor(count: number){
    super('Творог', count, new Weight('г'));
  }

  copy(): CottageCheese{
    return new CottageCheese(this.count);
  }
}
