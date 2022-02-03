module.exports = {
   client: 'mysql',
   connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.NODE_ENV != "test" ?
         process.env.DB_NAME : `${process.env.DB_NAME}_test`
   },
   pool: {
      min: process.env.DB_POOL_MIN || 2,
      max: process.env.DB_POOL_MAX || 10
   },
   migrations: {
      tableName: "migrations"
   }
};
