const {
  PORT = 3000,
  JWT_SECRET = "your-secret-key",
  MONGO_URI = "mongodb://127.0.0.1:27017/news_db",
  NODE_ENV = "development",
} = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
  MONGO_URI,
  NODE_ENV,
  isProduction: NODE_ENV === "production",
};
