import express from 'express';
import cors from 'cors';

const server = (port, routers) => {
  const app = express();

  app.use(cors())

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
