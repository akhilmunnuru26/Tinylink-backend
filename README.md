# TinyLink - URL Shortener

A full-stack URL shortening service similar to bit.ly. Create short links, track clicks, and manage URLs with a clean interface.

## 🚀 Live Demo

- **Frontend**: https://tinylinkfrontend.vercel.app/
- **Backend API**: https://tinylink-backend.onrender.com
- **Health Check**: https://tinylink-backend.onrender.com/healthz

## 📋 Features

- ✅ Shorten URLs with custom or auto-generated codes
- ✅ Track click analytics (total clicks, last clicked time)
- ✅ Search and filter links
- ✅ Sortable data table
- ✅ Copy to clipboard
- ✅ Responsive design
- ✅ RESTful API

## 🛠 Tech Stack

**Frontend:** React + Vite + React Router + Axios + Tailwind CSS  
**Backend:** Node.js + Express + PostgreSQL  
**Deployment:** Vercel (Frontend) + Render (Backend) + Neon (Database)

## 🚦 Quick Start

### Backend Setup
npm install

Create .env file

PORT=5000
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
NODE_ENV=development
FRONTEND_URL=http://localhost:5173


Create database table (run in PostgreSQL)
CREATE TABLE links (
code VARCHAR(8) PRIMARY KEY,
target_url TEXT NOT NULL,
clicks BIGINT DEFAULT 0,
created_at TIMESTAMP DEFAULT now(),
last_clicked TIMESTAMP
);


npm run dev

Server runs at http://localhost:5000

































