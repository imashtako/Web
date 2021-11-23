import Game from "./game";
import User from "./user";
import * as games from "./default_games"
import * as users from "./default_users"

export default class Storage{
    games: Array<Game>;
    users: Array<User>;
    constructor(){
        this.games = [];
        this.users = [];
    }
    deleteGame(index: number){
        const game = this.games[index];
        this.users.forEach(user => user.deleteGame(game));
        this.games.splice(index, 1);
    }
    updateGame(index: number, game: Game){
        this.games[index] = game;
    }
    addGame(game: Game){
        this.games.push(game);
    }

    addUser(user: User){
        this.users.push(user);
    }
    updateUser(index: number, user: User){
        this.users[index] = user;
    }
    deleteUser(index: number){
        this.users.splice(index, 1);
    }
}

export const globalStorage = new Storage();

export function fillStorage(storage: Storage) {
    storage.addGame(games.MIRRORS_EDGE);
    storage.addGame(games.DEUS_EX);
    storage.addGame(games.TITANFALL2);
    storage.addGame(games.FINAL_FANTASY);

    storage.addUser(users.SEPHIROTH);
    storage.addUser(users.GREGOR);
}