const MAX_QUALITY = 50;

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class UpdatableItem extends Item {
    constructor(name: string, sellIn: number, quality: number) {
        super(name, sellIn, 0);
        this.setQuality(quality);
    }

    setQuality(quality) {
        this.quality = Math.max(Math.min(quality, MAX_QUALITY), 0);
    }

    saleDayHasPassed(): boolean {
        return this.sellIn <= 0;
    }

    isConjured(): boolean{
        return this.name.toLowerCase().indexOf("conjured") != -1;
    }

    update() {
        if (this.saleDayHasPassed()) {
            this.setQuality(this.quality - (this.isConjured()?4:2));
        } else {
            this.setQuality(this.quality - (this.isConjured()?2:1));
        }
        this.sellIn--;
    }

    static getKeyWord(): string {
        return "";
    }
}

export class AgedBrie extends UpdatableItem {
    static getKeyWord(): string {
        return "Aged Brie";
    }

    update() {
        this.setQuality(this.quality + 1);
        this.sellIn--;
    }
}

export class BackstagePasses extends UpdatableItem {
    static getKeyWord(): string {
        return "Backstage passes";
    }

    update() {
        if (this.saleDayHasPassed()) {
            this.setQuality(0);
        } else if (this.sellIn <= 5) {
            this.setQuality(this.quality += 3);
        } else if (this.sellIn <= 10) {
            this.setQuality(this.quality += 2);
        } else {
            this.setQuality(this.quality += 1);
        }

        this.sellIn--;
    }
}

export class Sulfuras extends UpdatableItem {
    static getKeyWord(): string {
        return "Sulfuras";
    }

    setQuality(quality) {
        if (quality > this.quality) {
            super.setQuality(quality);
        }
    }

    update() {
    }
}

