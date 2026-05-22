# DevPulse 🚀

DevPulse is a backend API for an internal tech issue and feature tracking system where teams can report bugs, suggest features, and manage issue workflows.

## Live URL

https://devpulse-gray.vercel.app

---

## Features

- User registration and login with JWT authentication
- Role-based authorization (Contributor / Maintainer)
- Create issues (bug / feature request)
- Get all issues with filtering and sorting
- Get single issue details
- Update issues with permission control
- Delete issues (Maintainer only)
- Password hashing using bcrypt
- PostgreSQL database with raw SQL queries
- Automatic timestamp handling

---

## Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- pg
- JWT (jsonwebtoken)
- bcryptjs

---

## Installation & Setup

### Clone repository

```bash
git clone https://github.com/abdulrehmanaarmaan/devpulse.git
cd devpulse
```

### Install dependencies

```bash
npm install
```

### Create environment file

Create `.env`

```env
PORT=5000
CONNECTION_STRING=<your_database_connection_string>
JWT_SECRET=<your_secret_key>
```

### Run development server

```bash
npm run dev
```

### Build project

```bash
npm run build
```

### Start production server

```bash
npm start
```

---

## API Endpoints

### Authentication

| Method | Endpoint |
|--------|----------|
| POST | `/api/auth/signup` |
| POST | `/api/auth/login` |

### Issues

| Method | Endpoint |
|--------|----------|
| POST | `/api/issues` |
| GET | `/api/issues` |
| GET | `/api/issues/:id` |
| PATCH | `/api/issues/:id` |
| DELETE | `/api/issues/:id` |

---

## Query Parameters

Get all issues:

```http
GET /api/issues?sort=newest&type=bug&status=open
```

Available values:

- sort → `newest`, `oldest`
- type → `bug`, `feature_request`
- status → `open`, `in_progress`, `resolved`

---

## Database Schema Summary

### users

- id
- name
- email
- password
- role
- created_at
- updated_at

### issues

- id
- title
- description
- type
- status
- reporter_id
- created_at
- updated_at

---

## Project Structure

```plaintext
src
├── db
├── middleware
├── module
├── reusable_function
├── app.ts
├── config.ts
├── server.ts
```