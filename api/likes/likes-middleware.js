
const usersModel = require("../users/users-model");
const likeModel = require("../likes/likes-model");
const tweetModel = require("../tweets/tweets-model");



const checkFavsByPostId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const favUsers = await likeModel.getByPostId(id);
    if (!favUsers || favUsers.length <= 0) {
      res
        .status(400)
        .json({ message: `No user found who liked post id: ${id}.` });
    } else {
      req.favUsers = favUsers;
      next();
    }
  } catch (error) {
    next(error);
  }
};

//checks if the post favorited before
const isFavoritedBefore = async (req, res, next) => {
  const user_id = req.params.user_id;
  const tweet_id = req.params.tweet_id;
  const favPosts = await likeModel.getByPostId(tweet_id);
  const isFavorited = favPosts.filter((tweet) => tweet.user_id == user_id);

  if (isFavorited.length > 0) {
    res
      .status(400)
      .json({ message: `Tweet with the id: ${tweet_id} already liked!...` });
  } else {
    next();
  }
};

//checks if the post favorited before
const isPostInFavorites = async (req, res, next) => {
  const user_id = req.params.user_id;
  const tweet_id = req.params.tweet_id;
  const favPosts = await likeModel.getByPostId(tweet_id);
  const isFavorited = favPosts.filter((tweet) => tweet.user_id == user_id);

  if (isFavorited.length > 0) {
    next();
  } else {
    res
      .status(400)
      .json({ message: `Tweet with the id: ${tweet_id} not found in likes.` });
  }
};



module.exports = {
  checkFavsByPostId,
  isFavoritedBefore,
  isPostInFavorites,
};