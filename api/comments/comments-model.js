const db = require("../../data/db-config");


async function getById(id) {
  const commentsOfUser = await db("comments as c")
    .where("c.user_id", id)
    .select("c.*");

  return commentsOfUser;
}

async function getByTweetId(id) {
  const commentsForTweet = await db("comments as c")
    .where("c.tweet_id", id)
    .select("c.*");

  return commentsForTweet;
}

async function create(user_id, tweet_id, comment) {
  const [commentId] = await db("comments").insert({
    user_id: user_id,
    tweet_id: tweet_id,
    comment: comment,
  });
  return commentId;
}


async function update(commentId, updated) {
  await db("comments").where({ comment_id: commentId }).update(updated);
  
  const updatedComment = await db("comments").where({ comment_id: commentId }).first();
  return updatedComment;
}


async function deleteComment(commentId) {
  const deletedComment = await db("comments as c").where("c.comment_id", commentId).delete();
  return deletedComment;
}


module.exports = { getById, getByTweetId, create, deleteComment, update};