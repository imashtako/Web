import Game from "./game";

export default class User{
    username: string;
    games: Array<Game>;
    times: Array<number>;

    constructor(name: string){
        this.username = name;
        this.games = [];
        this.times = [];
    }

    getGameIndex(game: Game): number {
        for(let i = 0; i < this.games.length; i++){
            if (this.games[i].title == game.title) {
                return i;
            }
        }
        return -1;
    }

    deleteGame(game: Game){
        const index = this.getGameIndex(game);
        this.games.splice(index, 1);
        this.times.splice(index, 1);
    }
    addGame(game: Game, time: number){
        this.games.push(game);
        this.times.push(time);
    }

    static fromJson(obj: {username: string}): User{
        return new User(obj.username)
    }
}