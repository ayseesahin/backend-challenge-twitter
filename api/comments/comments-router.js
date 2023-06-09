const router = require("express").Router();
const commentModel = require("./comments-model");
const commentsMw = require("./comments-middleware");

router.post(
  "/:user_id/:tweet_id",
  commentsMw.checkPayload,
  async (req, res, next) => {
    try {
      const userId = req.params.user_id;
      const tweetId = req.params.tweet_id;
      const addedComment = await commentModel.create(
        userId,
        tweetId,
        req.body.comment
      );
      if (addedComment) {
        res.status(200).json({ message: "Comment submitted successfully." });
      } else {
        res.status(400).json({ message: "Cannot submit comment." });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:comment_id", async (req, res, next) => {
  try {
    const commentId = req.params.comment_id;
    const textComment = req.body.comment;

    const existingComment = await commentModel.getById(commentId);
    if (!existingComment) {
      return res.status(404).json({ message: "Cannot found comment." });
    }

    const updatedComment = await commentModel.update(commentId, {
      comment: textComment,
    });

    res.status(200).json({ message: "Cannot update comment.", updatedComment });
  } catch (error) {
    next(error);
  }
});

router.delete("/:comment_id", async (req, res, next) => {
  try {
    const commentId = req.params.comment_id;
    const deletedComment = await commentModel.deleteComment(commentId);
    if (deletedComment) {
      res.status(200).json({ message: "Comment deleted successfully." });
    } else {
      res.status(400).json({ message: "Cannot delete comment." });
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;