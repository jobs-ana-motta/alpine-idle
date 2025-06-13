import { FastifyPluginAsync } from 'fastify';

export interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [];
let nextId = 1;

const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    email: { type: 'string' },
  },
  required: ['id', 'name', 'email'],
};

const messageSchema = {
  type: 'object',
  properties: { message: { type: 'string' } },
  required: ['message'],
};

const usersRoutes: FastifyPluginAsync = async (app) => {
  app.get<{ Reply: User[] }>('/users', {
    schema: { response: { 200: { type: 'array', items: userSchema } } },
  }, async () => users);

  app.get<{ Params: { id: number }; Reply: User | { message: string } }>('/users/:id', {
    schema: {
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } },
        required: ['id'],
      },
      response: {
        200: userSchema,
        404: messageSchema,
      },
    },
  }, async (request, reply) => {
    const user = users.find((u) => u.id === Number(request.params.id));
    if (!user) {
      return reply.code(404).send({ message: 'User not found' });
    }
    return user;
  });

  app.post<{ Body: Omit<User, 'id'>; Reply: User }>('/users', {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
        },
        required: ['name', 'email'],
      },
      response: { 200: userSchema },
    },
  }, async (request) => {
    const newUser: User = { id: nextId++, ...request.body };
    users.push(newUser);
    return newUser;
  });

  app.put<{ Params: { id: number }; Body: Partial<Omit<User, 'id'>>; Reply: User | { message: string } }>('/users/:id', {
    schema: {
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } },
        required: ['id'],
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
        },
      },
      response: {
        200: userSchema,
        404: messageSchema,
      },
    },
  }, async (request, reply) => {
    const user = users.find((u) => u.id === Number(request.params.id));
    if (!user) {
      return reply.code(404).send({ message: 'User not found' });
    }
    if (request.body.name !== undefined) {
      user.name = request.body.name;
    }
    if (request.body.email !== undefined) {
      user.email = request.body.email;
    }
    return user;
  });

  app.delete<{ Params: { id: number }; Reply: { message: string } | { message: string } }>('/users/:id', {
    schema: {
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } },
        required: ['id'],
      },
      response: {
        200: messageSchema,
        404: messageSchema,
      },
    },
  }, async (request, reply) => {
    const index = users.findIndex((u) => u.id === Number(request.params.id));
    if (index === -1) {
      return reply.code(404).send({ message: 'User not found' });
    }
    users.splice(index, 1);
    return { message: 'User deleted' };
  });
};

export default usersRoutes;
