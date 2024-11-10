// src/controllers/taskController.ts
import { Request, Response } from 'express';
import prisma from '../config/db';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    const newTask = await prisma.task.create({
      data: { title, description, status },
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ message: 'Error creating task' });
  }
};