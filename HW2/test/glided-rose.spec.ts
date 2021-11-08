import { expect } from 'chai';
import {GildedRose} from '../app/glided-rose';
import {AgedBrie, BackstagePasses, Item, Sulfuras, UpdatableItem} from "../app/Items";
import createItem from "../app/factory";

describe('Gilded Rose', function () {

    it('should foo', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).equal('foo');
    });
});

describe('General tests', () => {
    it('UpdatableItem object degrees quality and sell in', () => {
        const item = new UpdatableItem('foo', 4, 7);
        const gildedRose = new GildedRose([item]);
        gildedRose.updateQuality();
        expect(item.name).equal('foo');
        expect(item.sellIn).equal(3);
        expect(item.quality).equal(6);
    });

    it('Item object dont perish', () => {
        const item = new Item('foo', 4, 7);
        const gildedRose = new GildedRose([item]);
        gildedRose.updateQuality();
        expect(item.name).equal('foo');
        expect(item.sellIn).equal(4);
        expect(item.quality).equal(7);
    });

    it('Factory work right', () => {
        expect(createItem('name', 1,2)).instanceOf(UpdatableItem);
        expect(createItem('Sulfuras', 1,2)).instanceOf(Sulfuras);
        expect(createItem('Best backstage passes', 1,2)).instanceOf(BackstagePasses);
    });
});

describe('Tests by requirements', () => {
    it('Once the sell by date has passed, Quality degrades twice as fast', () =>{
        const item = new UpdatableItem('foo', 1, 7);
        const gildedRose = new GildedRose([item]);
        gildedRose.updateQuality();
        expect(item.quality).equal(6);
        gildedRose.updateQuality();
        expect(item.quality).equal(4);
    });

    it('The Quality of an item is never negative', () =>{
        const item = new UpdatableItem('foo', 10, 1);
        const gildedRose = new GildedRose([item]);
        gildedRose.updateQuality();
        expect(item.quality).equal(0);
        gildedRose.updateQuality();
        expect(item.quality).equal(0);
    });

    it('"Aged Brie" actually increases in Quality the older it gets', () =>{
        const item = new AgedBrie('Aged Brie', 10, 1);
        const gildedRose = new GildedRose([item]);
        gildedRose.updateQuality();
        expect(item.quality).equal(2);
    });

    it('The Quality of an item is never more than 50', () =>{
        const item = new AgedBrie('Aged Brie',10, 60);
        const gildedRose = new GildedRose([item]);
        expect(item.quality).equal(50);
        gildedRose.updateQuality();
        expect(item.quality).equal(50);
        item.setQuality(60);
        expect(item.quality).equal(50);
    });

    it('"Sulfuras", being a legendary item, never has to be sold or decreases in Quality', () => {
        const item = new Sulfuras('Sulfuras', 10, 30);
        const gildedRose = new GildedRose([item]);
        gildedRose.updateQuality();
        expect(item.quality).equal(30);
        expect(item.sellIn).equal(10);
        item.setQuality(10);
        expect(item.quality).equal(30);
        item.setQuality(40);
        expect(item.quality).equal(40);
    });

    it('"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches', () =>{
        const item13 = new BackstagePasses('Backstage passes', 13, 1);
        const item7 = new BackstagePasses('Backstage passes', 7, 1);
        const item3 = new BackstagePasses('Backstage passes', 3, 1);
        const item0 = new BackstagePasses('Backstage passes', 0, 1);
        const gildedRose = new GildedRose([item13, item7, item3, item0]);
        gildedRose.updateQuality();
        expect(item13.quality).equal(2);
        expect(item7.quality).equal(3);
        expect(item3.quality).equal(4);
        expect(item0.quality).equal(0);
    });

    it('"Conjured" items degrade in Quality twice as fast as normal items', () =>{
        const item = new UpdatableItem('foo', 1, 7);
        const conjuredItem = new UpdatableItem('conjured foo', 1, 7);
        const gildedRose = new GildedRose([item, conjuredItem]);
        gildedRose.updateQuality();
        expect(item.quality).equal(6);
        expect(conjuredItem.quality).equal(5);
        gildedRose.updateQuality();
        expect(item.quality).equal(4);
        expect(conjuredItem.quality).equal(1);
    })
});