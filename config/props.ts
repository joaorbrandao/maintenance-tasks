const props = {
  server: {
    port: process.env.SERVER_PORT || 3000,
  },
  auth: {
    secret: process.env.SECRET_KEY || 'SW0rdSuper5ecretKey',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    name: process.env.DB_NAME || 'maintenance-tasks',
    user: process.env.DB_USER || 'maintenance-tasks_user',
    password: process.env.DB_PASSWORD || 'maintenance-tasks_p4s5w0rd',
  },
  broker: {
    host: process.env.BROKER_HOST || 'localhost',
    port: process.env.BROKER_PORT || 5672,
    exchanges: {
      tasks: {
        name: process.env.BROKER_EXCHANGE_TASKS_NAME || 'tasks',
        deadLetterName:
          process.env.BROKER_DL_EXCHANGE_TASK_PERFORMED || 'tasks.dlx',
        options: {
          durable: true,
        },
        routingKeys: {
          performed:
            process.env.BROKER_ROUTING_KEY_TASK_PERFORMED || 'performed',
        },
        queues: {
          performed: {
            name: process.env.BROKER_QUEUE_TASK_PERFORMED || 'tasks.performed',
            options: { durable: true },
          },
        },
      },
    },
  },
};

export { props };
