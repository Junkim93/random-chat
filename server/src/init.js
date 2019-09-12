import app from './app';
import syncDb from './sync-db';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

function handleListening() {
  console.log(`LISTENING ON: http://localhost:${PORT}`);
}

syncDb().then(_ => {
  console.log('Sync Database!');
  app.httpServer.listen(PORT, handleListening);
});
