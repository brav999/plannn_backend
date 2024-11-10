import express, { Request, Response, NextFunction } from "express";
import { 
    createTask, 
    getTasks
} from "../controllers/taskController";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Rotas
router.get(
    "/", 
    getTasks
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