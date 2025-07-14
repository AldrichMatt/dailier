@echo off

start "Nodemon" cmd /k "cd backend && npx nodemon index.js"

start "Prisma Studio" cmd /k "cd backend && npx prisma studio"

start "Frontend" cmd /k "cd frontend && npm run start"