import {Item, UpdatableItem} from "./Items";

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality(): Array<Item> {
        for(let item of this.items){
            if(item instanceof UpdatableItem)
                item.update();
        }
        return this.items;
    }
}