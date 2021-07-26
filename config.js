const config = {
  dbUrl:
    process.env.DB_URL ||
    "mongodb+srv://user:user1234@telegrom.mitfu.mongodb.net/Telegrom?retryWrites=true&w=majority",
  port: process.env.PORT || 3000,
  host: process.env.HOST || "http://localhost",
};

module.exports = config;
