/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex("Users")
		.del()
		.then(function () {
			return knex("Users").insert([
				{
					username: "apple_back",
					email: "apple@work.com",
					password: "pass1234",
					name: "Apple Sue",
				
				},
				{
					username: "doctor_house",
					email: "doctor@work.com",
					password: "pass1234",
					name: "Doctor House",
					
				},
			]);
		})
		.then(function () {
			return knex("tweets").insert([
				{
					userId: 1,
					content: "Hello, I' am Elma!...",
				},
				{
					userId: 2,
					content: "Hello patients :)",
				},
        {
					userId: 1,
					content: "Hello :)",
				},
        {
					userId: 2,
					content: "Hello world!",
				},
			]);
		})
		.then(function () {
			return knex("comments").insert([
				{
					userId: 1,
					tweetId: 2,
          comment: "It's true"
				},
				{
          userId: 2,
					tweetId: 2,
          comment: "It's true"
				},
			]);
		})
		.then(function () {
			return knex("likes").insert([
				{
					userId: 1,
					tweetId: 1,
				},
				{
					userId: 2,
					tweetId: 2
				},
			]);
		});
};