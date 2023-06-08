const db = require("../../data/db-config");

//brings favorited tweet with favorite_id
async function getByFavId(id) {
  const favedPost = await db("likes").where("favorite_id", id).first();
  return favedPost;
}

//gets users liked tweets (returns array with tweet objects)
async function getById(id) {
  const favPosts = await db("likes as l")
    .join("tweets as p", "l.tweet_id", "=", "p.tweet_id")
    .where("l.user_id", id)
    .select("p.*");

  return favPosts;
}

//gets users who favorited the tweet (returns array with users)
async function getByPostId(id) {
  const favoritedByUsers = await db("likes as l")
    .join("users as u", "l.user_id", "=", "u.user_id")
    .where("l.tweet_id", id)
    .select("u.username", "u.user_id")
  

  return favoritedByUsers;
}

async function create(user_id, tweet_id) {
  const [id] = await db("likes as l").insert({
    user_id: user_id,
    tweet_id: tweet_id,
  });
  return getByFavId(id);
}

function remove(user_id, tweet_id) {
  return db("likes as l")
    .where({ user_id: user_id, tweet_id: tweet_id })
    .del();
}

module.exports = { getByFavId, getById, getByPostId, create, remove };