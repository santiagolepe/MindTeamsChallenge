
import Server from './services/server';
import MongoDB from './services/mongo';
import Routes from './routes';
import Swagger from './services/swagger';

try {
  Server.init();
  MongoDB.init();
  Swagger.init();
  Routes.init();

} catch (error: any) {
  console.error({
    message: {
      description: 'Start app',
      trace      : error.stack || error.trace,
      error
    }
  });
  // exit node and send info to kubernetes
  process.exit(1);
}