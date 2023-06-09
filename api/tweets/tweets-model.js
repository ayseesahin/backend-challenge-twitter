const db = require("../../data/db-config");

function getAll() {
  return db("tweets");
}

async function getBy(filter) {
  const tweets = await db("tweets").where(filter);
  return tweets;
}

async function getById(id) {
  const tweet = await db("tweets").where("tweet_id", id).first();
  return tweet;
}

async function create(tweet) {
  const [id] = await db("tweets").insert(tweet);
  return getById(id);
}

async function remove(id) {
  return db("tweets").where("tweet_id", id).del();
}

async function update(id, tweet) {
  await db("tweets").where("tweet_id", id).update({ content: tweet.content });

  return getById(id);
}

module.exports = {
  getAll,
  getBy,
  getById,
  create,
  remove,
  update,
};
