import fastify from 'fastify';

const app = fastify({ logger: true });

app.get('/ping', async (_request, _reply) => {
  return { pong: 'it works!' };
});

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
