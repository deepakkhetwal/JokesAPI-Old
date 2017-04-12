/**
 * Created by deepakkhetwal on 4/9/17.
 */
const jokeReviewService = require("../services/jokeReviewService");
class JokeReviewController {
  async findJokesForReview(){
      return await jokeReviewService.findJokesForReview();
  }
};
module.exports = new JokeReviewController();