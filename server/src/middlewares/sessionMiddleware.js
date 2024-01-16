import session from "express-session";
import MongoStore from "connect-mongo";
import config from "../config/index.js";

const sessionMiddleware = session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
  },
  store: MongoStore.create({ mongoUrl: config.mongodbURI, collectionName: "sessions" }),
});

export default sessionMiddleware;
