/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("Users", table => {
        table.increments()
        table.string("name", 30).notNullable();
        table.string("username", 10).notNullable();
        table.string("password").notNullable();
        table.string("email").notNullable();
        
    })
    .createTable("tweets", function (table) {
        table.increments("id").primary();
        table.integer("userId").unsigned().references("id").inTable("Users");
        table.string("content").notNullable();
        table.timestamp("createdAt").defaultTo(knex.fn.now()); 
    })
    .createTable("comments", function (table) {
        table.increments("id").primary();
        table.integer("userId").unsigned().references("id").inTable("Users");
        table.integer("tweetId").unsigned().references("id").inTable("tweets");
        table.string("comment").notNullable();
    })
    .createTable("likes", function (table) {
        table.integer("tweetId").unsigned().references("id").inTable("tweets");
        table.integer("userId").unsigned().references("id").inTable("Users");
        table.primary(["tweetId", "userId"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("Users")
      .dropTableIfExists("tweets")
      .dropTableIfExists("comments")
      .dropTableIfExists("likes");
  };
