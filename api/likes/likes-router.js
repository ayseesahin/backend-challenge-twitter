const router = require("express").Router();
const likeModel = require("./likes-model");
//const mw = require("./tweets-middleware");
const likeMw = require("../likes/likes-middleware");
const userModel = require('../users/users-model');
const tweetModel = require('../tweets/tweets-model');

// adds post to likes
router.post(
  "/:user_id/:tweet_id",
  likeMw.isFavoritedBefore,
  async (req, res, next) => {
    try {
      const userId = req.params.user_id;
      const tweetId = req.params.tweet_id;

      // Kullanıcı veya tweet bulunamazsa hata mesajı döndürülür
      const userExists = await userModel.getById(userId);
      const tweetExists = await tweetModel.getById(tweetId);
      if (!userExists) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı." });
      }
      if (!tweetExists) {
        return res.status(404).json({ message: "Tweet bulunamadı." });
      }

      if (userId && tweetId) {
        const favoritedTweet = await likeModel.create(userId, tweetId);
        res
          .status(200)
          .json({ message: "Tweet beğenilere eklendi.", favoritedTweet });
      } else {
        res.status(400).json({ message: "Beğenilere eklenemedi." });
      }
    } catch (error) {
      next(error);
    }
  }
);


router.delete(
  "/:user_id/:tweet_id",
  likeMw.isPostInFavorites,
  async (req, res, next) => {
    try {
      const userId = req.params.user_id;
      const tweetId = req.params.tweet_id;
      if (userId && tweetId) {
        await likeModel.remove(userId, tweetId);
        res
          .status(200)
          .json({ message: `Tweet with id: ${tweetId} removed from likes.` });
      } else {
        res.status(400).json({
          message: `Cannot remove the tweet with id: ${tweetId} from likes.`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;