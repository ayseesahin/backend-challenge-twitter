const router = require("express").Router();
const tweetsModel = require("./tweets-model");
const tweetsMw = require("./tweets-middleware");
const likesMw = require("../likes/likes-middleware");
const usersMw = require("../users/users-middleware");
const commentsMw = require("../comments/comments-middleware");


// brings all tweets for feed
router.get("/", async (req, res, next) => {
  try {
    const tweets = await tweetsModel.getAll();
    res.status(200).json(tweets);
  } catch (error) {
    next(error);
  }
});

// brings all tweets of user with id
router.get("/:id", usersMw.isIdExist, async (req, res, next) => {
  try {
    const id = req.params.id;
    const userTweets = await tweetsModel.getBy({ user_id: id }); // Kullanıcının tweetlerini alın
    res.status(200).json(userTweets);
  } catch (error) {
    next(error);
  }
});

//creates new post
router.post("/", tweetsMw.checkPayload, async (req, res, next) => {
  try {
    const { content, user_id } = req.body;
    const newTweet = { user_id: user_id, content: content };
    const insertedTweet = await tweetsModel.create(newTweet);
    if (!insertedTweet) {
      next(error);
    } else {
      res
        .status(200)
        .json({ message: "New post successfully submitted.", insertedTweet });
    }
  } catch (error) {
    next(error);
  }
});

//updates post

router.put("/:id", tweetsMw.checkPayload, async (req, res, next) => {
  try {
  const id = req.params.id;
  const { content, user_id } = req.body;
  const updatedTweet = await tweetsModel.update(id, { content, user_id });
  if (!updatedTweet) {
  next(error);
  } else {
  res.status(200).json({ message: "Edited post successfully submitted.", updatedTweet });
  }
  } catch (error) {
  next(error);
  }
  });

//deletes post

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedPost = await tweetsModel.remove(id);
    if (!deletedPost) {
      res.status(400).json({ message: `Post with id: ${id} is not found.` });
    } else {
      res.status(200).json({ message: "Post removed successfully." });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id/likes", likesMw.checkFavsByPostId, async (req, res, next) => {
    try {
      const favoriteUsers = req.favUsers;
      res.status(200).json(favoriteUsers);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id/comments",
  commentsMw.checkCommentsByPostId,
  async (req, res, next) => {
    try {
      const comments = req.comments;
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;