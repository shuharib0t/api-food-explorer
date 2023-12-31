const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const dishesRouter = require("./dishes.routes");
const favoritesRouter = require("./favorites.routes");
const creditCardsRouter = require("./credit_cards.routes");
const addressRouter = require("./address.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/dishes", dishesRouter);
routes.use("/favorites", favoritesRouter);
routes.use("/credit_cards", creditCardsRouter);
routes.use("/address", addressRouter);

module.exports = routes;
