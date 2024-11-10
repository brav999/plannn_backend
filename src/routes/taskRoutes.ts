import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Rotas
router.get(
    "/", async (req, res) => {
        try {
          const tasks = await prisma.task.findMany();
          res.status(200).json(tasks);
        } catch (error) {
          console.error('Error fetching tasks:', error);
          res.status(500).json({ message: 'Error fetching tasks' });
        }
      }
);

router.post("/", async (req, res) => {
    try {
      const { title, description, status } = req.body;
      const task = await prisma.task.create({
        data: { title, description, status },
      });
      res.status(201).json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

export default router;