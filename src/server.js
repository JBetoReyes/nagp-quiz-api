const express = require("express");

const server = (port, routers) => {
  const app = express();
  routers.forEach(({ name, router }) => {
    app.use(`/${name}`, router);
  });

  const expressServer = app.listen(port, () => {
    console.log(`App listening at ${port}`);
  });

  process.on("SIGTERM", () => {
    expressServer.close(function () {
      process.exit(0);
    });
  });
  process.on("SIGINT", () => {
    expressServer.close(function () {
      process.exit(0);
    });
  });
};

export default server;
