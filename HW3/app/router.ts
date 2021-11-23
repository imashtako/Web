import express from 'express';
import {Express} from 'express-serve-static-core';
import { createReadStream } from 'fs';
import { join } from 'path';

import {globalStorage} from "./storage";
import Game from "./game";
import User from "./user";


const PARAMS = {
    ID: 'Id',
    FILENAME: 'File',
};

function games(req: express.Request, res: express.Response) {
    const games = globalStorage.games;
    res.send(games);
}

function gamesWithId(req: express.Request, res: express.Response) {
    const id = +req.params[PARAMS.ID];
    const game = globalStorage.games[id];
    res.send(game);
}

function gamesPost(req: express.Request, res: express.Response) {
    const json = req.body;
    try {
        const game = Game.fromJson(json);
        globalStorage.addGame(game);
        res.send(`${globalStorage.games.length - 1}`);
    }
    catch (e) {
        console.log(e);
        res.status(400);
        res.send("Problem during encoding");
    }
}

function gamesPutWithId(req: express.Request, res: express.Response) {
    const json = req.body;
    const id = +req.params[PARAMS.ID];
    try {
        const game = Game.fromJson(json);
        globalStorage.updateGame(id, game);
        res.send(`changed`);
    }
    catch (e) {
        console.log(e);
        res.status(400);
        res.send("Problem during encoding");
    }
}

function gamesDeleteWithId(req: express.Request, res: express.Response) {
    const id = +req.params[PARAMS.ID];
    globalStorage.deleteGame(id);
    res.send(`deleted`);
}

function usersWithId(req: express.Request, res: express.Response) {
    const id = +req.params[PARAMS.ID];
    const user = globalStorage.users[id];
    if (user == undefined){
        res.send(undefined);
    }
    else {
        res.send({id, 'username': user.username});
    }
}

function usersPost(req: express.Request, res: express.Response) {
    const json = req.body;
    try {
        const user = User.fromJson(json);
        globalStorage.addUser(user);
        res.send(`${globalStorage.users.length - 1}`);
    }
    catch (e) {
        console.log(e);
        res.status(400);
        res.send("Problem during encoding");
    }
}


function usersPutWithId(req: express.Request, res: express.Response) {
    const json = req.body;
    const id = +req.params[PARAMS.ID];
    try {
        const user = User.fromJson(json);
        globalStorage.updateUser(id, user);
        res.send(`changed`);
    }
    catch (e) {
        console.log(e);
        res.status(400);
        res.send("Problem during encoding");
    }
}

function usersDeleteWithId(req: express.Request, res: express.Response) {
    const id = +req.params[PARAMS.ID];
    globalStorage.deleteUser(id);
    res.send(`deleted`);
}

function usersWithIdGames(req: express.Request, res: express.Response) {
    const id = +req.params[PARAMS.ID];
    const user = globalStorage.users[id];
    if (user == undefined){
        res.send(undefined);
    }
    else {
        res.send({'games': user.games});
    }
}

function usersWithIdGamesPost(req: express.Request, res: express.Response) {
    const id = +req.params[PARAMS.ID];
    const user = globalStorage.users[id];
    try {
        const gameId = req.body['id'];
        user.addGame(globalStorage.games[gameId], 0);
        res.send(`${user.games.length}`);
    }
    catch (e) {
        console.log(e);
        res.status(400);
        res.send("Problem during encoding");
    }
}

function textFile(req: express.Request, res: express.Response) {
    createReadStream(join(__dirname, req.params[PARAMS.FILENAME])).pipe(res);
}

export function addRouting(app: Express){
    app.get(`/games`, games);
    app.get(`/games/:${PARAMS.ID}`, gamesWithId);

    app.get(`/users/:${PARAMS.ID}`, usersWithId);
    app.get(`/users/:${PARAMS.ID}/games`, usersWithIdGames);

    app.get(`/static/text/:${PARAMS.FILENAME}`, textFile);

    app.delete(`/games/:${PARAMS.ID}`, gamesDeleteWithId);
    app.delete(`/users/:${PARAMS.ID}`, usersDeleteWithId);


    app.use(express.urlencoded());
    app.use(express.json());
    app.post(`/games`,  gamesPost);
    app.post(`/users`,  usersPost);
    app.post(`/users/:${PARAMS.ID}/games`, usersWithIdGamesPost);

    app.put(`/games/:${PARAMS.ID}`, gamesPutWithId);
    app.put(`/users/:${PARAMS.ID}`, usersPutWithId);
}
