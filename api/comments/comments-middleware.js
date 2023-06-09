const commentsModel = require("./comments-model");


const checkCommentsByTweetId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comments = await commentsModel.getByTweetId(id);
    if (!comments || comments.length <= 0) {
      res
        .status(400)
        .json({ message: `No comments found for this tweet id: ${id}.` });
    } else {
      req.comments = comments;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkPayload = async (req, res, next) => {
  try {
    const userId = req.params.user_id;
    const tweetId = req.params.tweet_id;
    const { comment } = req.body;
    if (!userId || !tweetId || !comment || comment.trim().length > 360) {
      res
        .status(400)
        .json({ message: `Can not create comment for tweet id: ${userId}.` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { checkCommentsByTweetId, checkPayload };