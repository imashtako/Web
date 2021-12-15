export abstract class Unit {
  abstract getUnit(count: number): string;
}

export class Glass extends Unit {
  getUnit(count: number): string{
    if(count % 1 != 0){
      return 'Стакана';
    }

    count = count % 10;

    if(count == 1){
      return 'стакан';
    }

    if (count >= 2 && count <= 4){
      return 'стакана';
    }

    return 'стаканов';
  }
}

export class Thing extends Unit {
  getUnit(count: number): string{
    if(count % 1 != 0){
      return 'Штуки';
    }

    count = count % 10;

    if(count == 1){
      return 'штука';
    }

    if (count >= 2 && count <= 4){
      return 'штуки';
    }

    return 'штук';
  }
}

export class Spoon extends Unit {
  getUnit(count: number): string{
    if(count % 1 != 0){
      return 'ложки';
    }

    count = count % 10;

    if(count == 1){
      return 'ложка';
    }

    if (count >= 2 && count <= 4){
      return 'ложки';
    }

    return 'ложек';
  }
}

export class Weight extends Unit {
  unit: string;

  constructor(unit: string){
    super();
    this.unit = unit;
  }

  getUnit(count: number): string{
    return this.unit;
  }
}
