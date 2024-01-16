import "dotenv/config";

const config = {
  port: process.env.PORT || 4000,
  sessionSecret: process.env.SESSION_SECRET,
  mongodbURI: process.env.MONGODB_URI,
};

export default config;
