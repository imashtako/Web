import express from 'express';
import {addRouting} from "./app/router";
import {globalStorage, fillStorage} from "./app/storage";

fillStorage(globalStorage);

const app = express();

addRouting(app);

app.listen(3000, () => {
    console.log("Express started");
});