import User from "./user";
import * as games from "./default_games"

export const SEPHIROTH = new User("xXx_sephiroth1997_xXx");
SEPHIROTH.addGame(games.FINAL_FANTASY, 400);
SEPHIROTH.addGame(games.MIRRORS_EDGE, 20);
SEPHIROTH.addGame(games.TITANFALL2, 10);

export const GREGOR = new User("Gregor");
SEPHIROTH.addGame(games.TITANFALL2, 175);
SEPHIROTH.addGame(games.DEUS_EX, 230);