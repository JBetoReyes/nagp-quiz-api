import express from 'express';
import cors from 'cors';

const server = (routers) => {
  const app = express();

  app.use(cors());

  routers.forEach(({ name, router }) => {
    app.use(`/${name}`, router);
  });
  return app;
};

export default server;
