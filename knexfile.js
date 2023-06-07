// // Update with your config settings.

// /**
//  * @type { Object.<string, import("knex").Knex.Config> }
//  */
// module.exports = {

//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: './data/twitter.db3'
//     },
//     migrations: {
//       directory: './data/migrations'
//     },
//     seeds: {
//       directory: './data/seeds'
//     },
//     useNullAsDefault: true,
//   },
// };

const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  seeds: { directory: './data/seeds' },
  migrations: { directory: './data/migrations' },
  pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: { filename: './data/twitter.db3' },
  
  },
  testing: {
    ...sharedConfig,
    connection: { filename: './data/test.db3' },
  },
};