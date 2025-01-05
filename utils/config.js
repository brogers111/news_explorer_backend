const {
  PORT,
  JWT_SECRET = "your-secret-key",
  MONGO_URI,
  NODE_ENV = "development",
} = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
  MONGO_URI,
  NODE_ENV,
  isProduction: NODE_ENV === "production",
};
