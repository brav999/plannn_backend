import express from 'express';
import prisma from './config/db'; // Importa o cliente Prisma configurado
import taskRoutes from './routes/taskRoutes';

const app = express();
const PORT = process.env['PORT'] || 3000;

app.use(express.json());

// Configura as rotas
app.use('/tasks', taskRoutes);

// Inicia o servidor
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Encerra a conexão com o Prisma ao finalizar o servidor
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(async () => {
    console.log('HTTP server closed');
    await prisma.$disconnect();
    console.log('Prisma disconnected');
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(async () => {
    console.log('HTTP server closed');
    await prisma.$disconnect();
    console.log('Prisma disconnected');
  });
});
