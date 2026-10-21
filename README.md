# Certificate Verification System

QR-based certificate system to prevent fake certificates.

## Features
- Add Students (Name, Roll No, Course)
- Generate Certificate with QR Code
- Verify via QR Scan
- Dashboard with View & Delete

## Tech Stack
Frontend: React + Vite
Backend: Node.js, Express, Prisma
DB: PostgreSQL
Auth: JWT

## Run Locally

Backend:
cd backend
npm install
npx prisma generate
npm run dev


Frontend:
cd frontend
npm install
npm run dev


## API
- POST /api/auth/login
- GET /api/students
- POST /api/students
- DELETE /api/students/:id
- POST /api/certificates/generate
- GET /api/certificates
- GET /api/certificates/verify/:id
- DELETE /api/certificates/:id

## Mobile QR Setup
In `certificateRoutes.ts` set:const localIP = '192.168.1.107'; // your wifi IP
# Certificate Verification System
QR-based certificate system to prevent fake certificates.
## Database
- PostgreSQL (Prisma ORM)
- Tables: Student, Certificate
- ID: cuid() (cmvhsnalx...)
## Tech Stack
Frontend: React.js, Vite, React Router
Backend: Node.js, Express.js
ORM: Prisma
Auth: JWT, bcrypt
## Languages Used
- JavaScript (Frontend & Backend)
- TypeScript (Backend routes)
- SQL (via Prisma)
- HTML / CSS (JSX)
## Libraries
- qrcode (QR generation)
- prisma/client
- jsonwebtoken
- cors
## Features
- Add Students (Name, Roll No, Course)
- Generate Certificate + QR
- Verify via QR Scan
- Dashboard: View + Delete
