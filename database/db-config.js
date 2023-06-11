const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "127.0.0.1",
      user: "root",
      password: "Admin@123",
      database: "event-checker-db",
    },
    listPerPage: 10,
  };
  module.exports = config;