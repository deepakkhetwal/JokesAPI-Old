/**
 * Created by deepakkhetwal on 3/11/17.
 */
"use strict";
const Koa = require('koa');
const Router = require('koa-66');
const app = new Koa();
const router = new Router();
const handleErrors = require("./middlewares/handleErrors");
const db = require("./dal/db");

app.use(handleErrors);

router.get('/review', (ctx, next) => {
   return next().then(() => {
       const jokeReviewController = require("./controllers/jokeReviewController");
       ctx.body = jokeReviewController.findJokesForReview();
   })
});

app.use(router.routes());

db
    .connect()
    .then(() => {
        app.listen(3000, () => {
            console.log('listening to port 3000');
        });
    })
    .catch((err) => {
        console.error("ERR:", err);
    });

