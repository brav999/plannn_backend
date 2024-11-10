import express, { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import { 
    createTask, 
    getTasks, 
    updateTask, 
    deleteTask 
} from "../controllers/taskController";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Rotas
router.get(
    "/", 
    getTasks
);

router.post(
    "/task", async (req, res) => {
        const{title, description, status} = req.body;
        const task = await prisma.task.createTask({
            data: {title, description, status},
        })
        res.json(task)
    }
);

router.put(
    "/:id",
    [
        check("id", "Invalid task ID").isMongoId(),
        check("title", "Title is required").optional().not().isEmpty(),
        check("description", "Description is required").optional().not().isEmpty(),
        check("status", "Status must be valid").optional().isIn(['pending', 'in_progress', 'completed'])
    ],
    updateTask
);

router.delete(
    "/:id",
    [
        check("id", "Invalid task ID").isMongoId()
    ],
    deleteTask
);

export default router;