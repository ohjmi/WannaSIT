import randomNameGenerator from "korean-random-names-generator";

function randomNameMiddleware(req, res, next) {
  if (!req.session.name) {
    const username = randomNameGenerator();
    req.session.name = username;
  }
  next();
}

export default randomNameMiddleware;
