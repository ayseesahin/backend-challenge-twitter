/**
 * @param { import("knex").Knex } knex
 * @awaits { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  
 await knex("users").truncate();
  await knex("tweets").truncate(); 
  
   await knex("likes").truncate();
   await knex("comments").truncate();
  
  

  await knex("users").insert([
    {
      
      username: "apple_back",
      password: "$2a$10$l.bP2RQgng16HnJA3DPdxuvjfJxlDVWVw8XO9f8sTtrcNUl4DQ5k6", //1234
      email: "apple@work.com",
	    avatar_url: "https://gravatar.com/avatar/844bc08d14027d8a74809e48be5a9772?s=400&d=identicon&r=x"
    },
    {
      
      username: "doctor_house",
      password: "1234",
      email: "doctor@work.com",
	    avatar_url: "https://gravatar.com/avatar/844bc08d14027d8a74809e48be5a9772?s=400&d=wavatar&r=x"
    },
  ]);

  await knex("tweets").insert([
    { user_id: 1, content: "Hello, I' am Elma!..." },
    { user_id: 2, content: "Hello patients :)" },
    { user_id: 1, content: "Hello :)" },
    { user_id: 2, content: "Hello world!" },
  ]);

  await knex("likes").insert([
    { user_id: 1, tweet_id: 1 },
    { user_id: 2, tweet_id: 2 },
  ]);

  await knex("comments").insert([
    { user_id: 1, tweet_id: 2, comment: "It's true" },
    { user_id: 2, tweet_id: 2, comment: "It's amazing!..." },
  ]);
};
