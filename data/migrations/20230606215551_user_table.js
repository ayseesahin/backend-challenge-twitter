/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
    .createTable("users", (table) => {
        table.increments("user_id");
        table.string("username").notNullable().unique();
        table.string("password").notNullable();
        table.string("email").notNullable().unique();
        table
          .string("avatar_url")
          .defaultTo(
            "https://i.pinimg.com/564x/b9/68/3d/b9683d3fe3f25bca278364f64f215c2a.jpg"
          );
      })
      .createTable("tweets", (table) => {
        table.increments("tweet_id");
        table.string("content").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .integer("user_id")
          .notNullable()
          .unsigned()
          .references("user_id")
          .inTable("users")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
      .createTable("likes", (table) => {
        table
          .integer("user_id")
          .notNullable()
          .unsigned()
          .references("user_id")
          .inTable("users")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        table
          .integer("tweet_id")
          .notNullable()
          .unsigned()
          .references("tweet_id")
          .inTable("tweets")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        table.primary(["user_id", "tweet_id"]);
      })
      .createTable("comments", (table) => {
        table.increments("comment_id");
        table.string("comment").notNullable();
        table
          .integer("user_id")
          .notNullable()
          .unsigned()
          .references("user_id")
          .inTable("users")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        table
          .integer("tweet_id")
          .notNullable()
          .unsigned()
          .references("tweet_id")
          .inTable("tweets")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
      .createTable("token_blacklist", (t) => {
        t.increments(), t.string("token").notNullable();
        t.timestamp("createdate").defaultTo(knex.fn.now());
      });
      
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists("token_blacklist")
      .dropTableIfExists("comments")
      .dropTableIfExists("likes")
      .dropTableIfExists("tweets")
      .dropTableIfExists("users");
  };
  