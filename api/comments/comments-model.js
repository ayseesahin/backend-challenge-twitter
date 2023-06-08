const db = require("../../data/db-config");


async function getById(id) {
  const commentsOfUser = await db("comments as c")
    .where("c.user_id", id)
    .select("c.*");

  return commentsOfUser;
}

//gets users who favorited the post (returns array with users)
async function getByPostId(id) {
  const commentsForPost = await db("comments as c")
    .where("c.tweet_id", id)
    .select("c.*");

  return commentsForPost;
}

async function create(user_id, tweet_id, comment) {
  const [commentId] = await db("comments").insert({
    user_id: user_id,
    tweet_id: tweet_id,
    comment: comment,
  });
  return commentId;
}


async function update(commentId, updatedFields) {
  await db("comments").where({ comment_id: commentId }).update(updatedFields);
  
  const updatedComment = await db("comments").where({ comment_id: commentId }).first();
  return updatedComment;
}


async function deleteComment(commentId) {
  const deletedComment = await db("comments as c").where("c.comment_id", commentId).delete();
  return deletedComment;
}


module.exports = { getById, getByPostId, create, deleteComment, update};