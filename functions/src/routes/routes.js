const todoRoutes = require("./todoRoutes");

/**
 * Config router for the application
 * @param {*} app 
 */
function configRouter(app) {
  app.use(todoRoutes.routes());
  app.use(todoRoutes.allowedMethods());
}

module.exports = configRouter;
