import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();
router.use(authenticate as any);

router.get('/', async (req, res) => {
  const students = await prisma.student.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(students);
});

router.post('/', async (req: AuthRequest, res) => {
  try {
    const { name, rollNo, course, email } = req.body;
    const student = await prisma.student.create({ data: { name, rollNo, course, email } });
    res.status(201).json({ message: 'Student added', student });
  } catch (e: any) {
    if (e.code === 'P2002') return res.status(400).json({ message: 'Roll No exists' });
    res.status(500).json({ message: 'Error', error: e.message });
  }
});

export default router;