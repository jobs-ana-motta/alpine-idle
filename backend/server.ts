import fastify from 'fastify';
import usersRoutes from './routes/users.js';
import itemsRoutes from './routes/items.js';

const app = fastify({ logger: true });

app.get('/ping', async (_request, _reply) => {
  return { pong: 'it works!' };
});

app.register(usersRoutes);
app.register(itemsRoutes);

const start = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT) || 3001, host: '0.0.0.0' });
    app.log.info(`Server listening on ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
