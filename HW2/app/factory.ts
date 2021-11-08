import {AgedBrie, BackstagePasses, Sulfuras, UpdatableItem} from "./Items";

const ItemsTypes = [AgedBrie, BackstagePasses, Sulfuras];

export default function createItem(name: string, sellIn: number, quality: number): UpdatableItem{
    for(let itemType of ItemsTypes){
        if(name.toLowerCase().indexOf(itemType.getKeyWord().toLowerCase()) != -1){
            return new itemType(name, sellIn, quality);
        }
    }
    return new UpdatableItem(name, sellIn, quality);
}
