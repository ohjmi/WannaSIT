import "dotenv/config";

const config = {
  port: process.env.PORT || 4000,
  sessionSecret: process.env.SESSION_SECRET,
};

export default config;
