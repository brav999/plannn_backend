import dotenv from 'dotenv';
import express, { Application } from 'express';

import taskRoutes from './routes/taskRoutes';

// Carregar variáveis de ambiente no início
dotenv.config();

const app: Application = express();

// Rotas
app.use('/api/v1/tasks', taskRoutes);

app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

// Tratamento de erros não capturados
process.on('unhandledRejection', (err: Error) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});

process.on('uncaughtException', (err: Error) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});

export default app;