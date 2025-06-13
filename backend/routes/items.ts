import { FastifyPluginAsync } from 'fastify';

export interface Item {
  id: number;
  name: string;
  description: string;
}

const items: Item[] = [];
let nextId = 1;

const itemSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    description: { type: 'string' },
  },
  required: ['id', 'name', 'description'],
};

const messageSchema = {
  type: 'object',
  properties: { message: { type: 'string' } },
  required: ['message'],
};

const itemsRoutes: FastifyPluginAsync = async (app) => {
  app.get<{ Reply: Item[] }>('/items', {
    schema: { response: { 200: { type: 'array', items: itemSchema } } },
  }, async () => items);

  app.get<{ Params: { id: number }; Reply: Item | { message: string } }>('/items/:id', {
    schema: {
      params: {
        type: 'object',
        properties: { id: { type: 'integer' } },
        required: ['id'],
      },
      response: {
        200: itemSchema,
        404: messageSchema,
      },
    },
  }, async (request, reply) => {
    const item = items.find((i) => i.id === Number(request.params.id));
    if (!item) {
      return reply.code(404).send({ message: 'Item not found' });
    }
    return item;
  });

  app.post<{ Body: Omit<Item, 'id'>; Reply: Item }>('/items', {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
        },
        required: ['name', 'description'],
      },
      response: { 200: itemSchema },
    },
  }, async (request) => {
    const newItem: Item = { id: nextId++, ...request.body };
    items.push(newItem);
    return newItem;
  });

  app.put<{ Params: { id: number }; Body: Partial<Omit<Item, 'id'>>; Reply: Item | { message: string } }>('/items/:id', {
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
          description: { type: 'string' },
        },
      },
      response: {
        200: itemSchema,
        404: messageSchema,
      },
    },
  }, async (request, reply) => {
    const item = items.find((i) => i.id === Number(request.params.id));
    if (!item) {
      return reply.code(404).send({ message: 'Item not found' });
    }
    if (request.body.name !== undefined) {
      item.name = request.body.name;
    }
    if (request.body.description !== undefined) {
      item.description = request.body.description;
    }
    return item;
  });

  app.delete<{ Params: { id: number }; Reply: { message: string } | { message: string } }>('/items/:id', {
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
    const index = items.findIndex((i) => i.id === Number(request.params.id));
    if (index === -1) {
      return reply.code(404).send({ message: 'Item not found' });
    }
    items.splice(index, 1);
    return { message: 'Item deleted' };
  });
};

export default itemsRoutes;
