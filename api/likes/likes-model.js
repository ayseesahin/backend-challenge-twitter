const db = require("../../data/db-config");

async function getByUserIdAndTweetId(user_id, tweet_id) {
  const favoritedTweet = await db("likes")
    .where({ user_id: user_id, tweet_id: tweet_id })
    .first();
  return favoritedTweet;
}

async function getByUserId(user_id) {
  const tweetLikes = await db("likes as l")
    .join("tweets as t", "l.tweet_id", "=", "t.tweet_id")
    .where("l.user_id", user_id)
    .select("t.*");

  return tweetLikes;
}

async function getUsersByTweetId(tweet_id) {
  const favoritedByUsers = await db("likes as l")
    .join("users as u", "l.user_id", "=", "u.user_id")
    .where("l.tweet_id", tweet_id)
    .select("u.username", "u.user_id");

  return favoritedByUsers;
}


async function create(user_id, tweet_id) {
  await db("likes").insert({
    user_id: user_id,
    tweet_id: tweet_id,
  });

  const favoritedTweet = await getByUserIdAndTweetId(user_id, tweet_id);
  return favoritedTweet;
}

function remove(user_id, tweet_id) {
  return db("likes as l")
    .where({ user_id: user_id, tweet_id: tweet_id })
    .del();
}

module.exports = { getByUserIdAndTweetId, getByUserId, getUsersByTweetId, create, remove };