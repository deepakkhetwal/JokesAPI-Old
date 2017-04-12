/**
 * Created by deepakkhetwal on 4/9/17.
 */
const db = require("../dal/db");
class JokeReviewService {
    async findJokesForReview(){
        return await db.joke.find({});
    }
};
module.exports = new JokeReviewService({is_reviewed: false});