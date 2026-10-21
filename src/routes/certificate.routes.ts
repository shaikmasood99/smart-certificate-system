import { Router } from 'express';

import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth';
import QRCode from 'qrcode';


const router = Router();
const prisma = new PrismaClient();

router.post('/generate', authenticate as any, async (req, res) => {
  try {
    const { studentId, course } = req.body;
    const student = await prisma.student.findUnique({ where: { id: studentId } });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const certificateId = `CERT-${Date.now()}-${student.rollNo}`;
    const os = require('os');

// Get your WiFi IP automatically
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const localIP = '192.168.1.107'; // YOUR WiFi IP
const verifyUrl = `http://${localIP}:5173/verify/${certificateId}`;

console.log('QR Verify URL:', verifyUrl); // You will see IP in backend terminal
    const qrCodeDataUrl = await QRCode.toDataURL(verifyUrl);

    const certificate = await prisma.certificate.create({
      data: { certificateId, studentId, course: course || student.course, qrCode: qrCodeDataUrl },
      include: { student: true }
    });

    res.status(201).json({ message: 'Certificate Generated!', certificate, verifyUrl });
  } catch (e: any) {
    res.status(500).json({ message: 'Error', error: e.message });
  }
});

router.get('/verify/:certificateId', async (req, res) => {
  const cert = await prisma.certificate.findUnique({
    where: { certificateId: req.params.certificateId },
    include: { student: true }
  });
  if (!cert) return res.status(404).json({ valid: false, message: 'Invalid Certificate - Fake!' });
  res.json({ valid: true, message: 'VALID ✅', certificate: { certificateId: cert.certificateId, studentName: cert.student.name, rollNo: cert.student.rollNo, course: cert.course, issueDate: cert.issueDate } });
});

router.get('/', authenticate as any, async (req, res) => {
  const certs = await prisma.certificate.findMany({ include: { student: true }, orderBy: { createdAt: 'desc' } });
  res.json(certs);
});
router.delete('/:id', authenticate as any, async (req, res) => {
  try {
    await prisma.certificate.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (e: any) {
    // try by certificateId
    try {
      await prisma.certificate.delete({ where: { certificateId: req.params.id } });
      res.json({ message: 'Deleted' });
    } catch {
      res.status(500).json({ message: 'Delete failed', error: e.message });
    }
  }
});
export default router;
