import server from './server';
import routes from './routes';

const { APP_PORT: appPort } = process.env;

const app = server(routes);

const expressServer = app.listen(appPort, () => {
  console.log(`App listening at ${appPort}`);
});

process.on('SIGTERM', () => {
  expressServer.close(() => {
    process.exit(0);
  });
});
process.on('SIGINT', () => {
  expressServer.close(() => {
    process.exit(0);
  });
});
