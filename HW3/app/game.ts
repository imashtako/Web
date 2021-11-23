import {globalStorage} from "./storage";
import Dict = NodeJS.Dict;

export default class Game{
    title: string;
    description: string;
    images: Array<string>;
    ageRating: string;

    constructor(title: string, description: string, images: Array<string>, ageRating: string){
        this.title = title;
        this.description = description;
        this.images = images;
        this.ageRating = ageRating;
    }

    static fromJson(obj: {title: string, description: string, images: Array<string>, ageRating: string}): Game{
        return new Game(
            obj['title'],
            obj['description'],
            obj['images'],
            obj['ageRating']
        );
    }
}