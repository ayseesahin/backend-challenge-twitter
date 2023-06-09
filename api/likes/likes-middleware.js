
const usersModel = require("../users/users-model");
const likeModel = require("../likes/likes-model");
const tweetModel = require("../tweets/tweets-model");



const checkFavByTweetId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const addedFavs = await likeModel.getUsersByTweetId(id);
    if (!addedFavs || addedFavs.length <= 0) {
      res
        .status(400)
        .json({ message: `No user found who liked this post id: ${id}.` });
    } else {
      req.addedFavs = addedFavs;
      next();
    }
  } catch (error) {
    next(error);
  }
};


const isFavoritedBefore = async (req, res, next) => {
  const user_id = req.params.user_id;
  const tweet_id = req.params.tweet_id;
  const tweetLikes = await likeModel.getUsersByTweetId(tweet_id);
  const isFavorited = tweetLikes.filter((tweet) => tweet.user_id == user_id);

  if (isFavorited.length > 0) {
    res
      .status(400)
      .json({ message: `Tweet with the id: ${tweet_id} already liked!...` });
  } 
    next();
  };


const isTweetInLikes = async (req, res, next) => {
  const user_id = req.params.user_id;
  const tweet_id = req.params.tweet_id;
  const tweetLikes = await likeModel.getUsersByTweetId(tweet_id);
  const isFavorited = tweetLikes.filter((tweet) => tweet.user_id == user_id);

  if (isFavorited.length > 0) {
    next();
  } else {
    res
      .status(400)
      .json({ message: `Tweet with the id: ${tweet_id} not found in likes.` });
  }
};



module.exports = {
  checkFavByTweetId,
  isFavoritedBefore,
  isTweetInLikes,
};