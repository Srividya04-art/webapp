# Blogging Web App

This is a full-stack blogging web application where users can register, log in, create posts, and manage their profiles. The project includes a React frontend, Node.js + Express backend, and a MySQL database.

## Features

- User registration and login
- Profile page with username, bio, and profile picture
- Create, edit, and delete blog posts
- Display posts on profile page
- Edit profile functionality (bio, username, profile picture)
- Responsive and user-friendly UI
- 
## Prerequisites

- Node.js and npm installed
- MySQL database setup
- Git (to clone the repository)

## Project Structure

webapp/
├─ web_app/ # React frontend
├─ web_app_backend/ # Node.js + Express backend

## Tech Stack

- Frontend: React, React Icons, CSS
- Backend: Node.js, Express
- Database: MySQL
- Authentication: JWT
- HTTP Requests: Axios

## Installation

### 1. Backend

```bash
cd webapp/web_app_backend
npm install
Create a .env file with:
PORT=5000
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_secret_key
Run the backend server:
npm start
/node server.js
2. Frontend
cd webapp/web_app
npm install
npm start
Open your browser at http://localhost:3000

Database

MySQL database with tables: users, posts

Users table stores: id, name, email, bio, profile_pic, password

Posts table stores: id, title, content, author_id, created_at

Usage

Register a new user

Login with your credentials

Update your profile (bio, username, and profile picture)

Create, edit, and delete blog posts

View all posts on your profile page

Notes

Make sure the backend server is running before using the frontend.

JWT token is required for protected routes.

Profile images should have valid URLs or be hosted on a server accessible from the frontend.
