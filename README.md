# 🚀 DevPulse Backend API

A scalable and secure Issue Tracking Backend API built with **Node.js**, **Express.js**, **TypeScript**, and **PostgreSQL**.

DevPulse helps developers and teams report bugs, manage feature requests, and track issue workflows with JWT-based authentication and role-based authorization.

---

## 🌐 Live API

```bash
https://devpulse-fa6e.onrender.com/
```

---

## 📂 Repository

```bash
https://github.com/Zarif207/DevPulse
```

---

# ✨ Features

- 🔐 JWT Authentication & Authorization
- 🛡️ Role-Based Access Control (RBAC)
- 🔑 Secure Password Hashing with bcrypt
- 📝 Create, Read, Update & Delete Issues
- 🗄️ PostgreSQL Database Integration
- ⚠️ Global Error Handling Middleware
- ✅ Request Validation
- 📦 Modular Express Architecture
- ☁️ Render Deployment
- 🌍 Neon PostgreSQL Cloud Database

---

# 🛠️ Technology Stack

| Technology | Usage |
|---|---|
| Node.js | Backend Runtime |
| Express.js | Web Framework |
| TypeScript | Type Safety |
| PostgreSQL | Relational Database |
| Neon | Cloud Database Hosting |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Render | Deployment Platform |

---

# 📁 Project Structure

```bash
src
├── db
│   └── index.ts
│
├── middleware
│   ├── auth.ts
│   ├── role.ts
│   └── globalErrorHandler.ts
│
├── modules
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.interface.ts
│   │   ├── auth.route.ts
│   │   └── auth.service.ts
│   │
│   └── issue
│       ├── issue.controller.ts
│       ├── issue.interface.ts
│       ├── issue.route.ts
│       └── issue.service.ts
│
├── types
│   └── express.d.ts
│
├── utils
│   └── sendResponse.ts
│
├── app.ts
└── server.ts
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/Zarif207/DevPulse.git
```

## Navigate Into Project

```bash
cd DevPulse
```

## Install Dependencies

```bash
npm install
```

---

# ▶️ Available Scripts

## Run Development Server

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

## Run Production Server

```bash
npm start
```

---

# 📌 API Endpoints

# 🔐 Authentication

## Register User

### Endpoint

```http
POST /api/auth/signup
```

### Request Body

```json
{
  "name": "Zarif Hasan",
  "email": "zarif@gmail.com",
  "password": "123456",
  "role": "contributor"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## Login User

### Endpoint

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "zarif@gmail.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token"
  }
}
```

---

# 🐞 Issue Management

## Create Issue

### Endpoint

```http
POST /api/issues
```

### Headers

```bash
Authorization: your_jwt_token
```

### Request Body

```json
{
  "title": "Dark mode issue",
  "description": "Navbar breaks during responsive dark mode testing",
  "type": "bug"
}
```

---

## Get All Issues

### Endpoint

```http
GET /api/issues
```

### Query Parameters

```bash
/api/issues?sort=newest

/api/issues?type=bug

/api/issues?status=open
```

---

## Get Single Issue

### Endpoint

```http
GET /api/issues/:id
```

### Example

```bash
/api/issues/1
```

---

## Update Issue

### Endpoint

```http
PATCH /api/issues/:id
```

### Headers

```bash
Authorization: your_jwt_token
```

### Request Body

```json
{
  "title": "Updated issue title"
}
```

---

## Delete Issue

### Endpoint

```http
DELETE /api/issues/:id
```

### Headers

```bash
Authorization: your_jwt_token
```

---

# 👥 Authorization Roles

| Role | Permissions |
|---|---|
| contributor | Create and manage own issues |
| maintainer | Full system access including delete |

---

# ✅ Validation Rules

## User Validation

- Email must be unique
- Password minimum length required
- Role must be:
  - contributor
  - maintainer

## Issue Validation

- Title maximum 150 characters
- Description minimum 20 characters
- Issue type must be:
  - bug
  - feature_request

---

# ⚠️ Error Handling

Centralized error handling is implemented for:

- Invalid JWT Token
- Unauthorized Requests
- Forbidden Access
- Validation Errors
- Resource Not Found
- Database Errors
- Internal Server Errors

---

# 🗄️ Database Schema

# Users Table

| Field | Type |
|---|---|
| id | Serial |
| name | VARCHAR |
| email | VARCHAR |
| password | TEXT |
| role | VARCHAR |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

# Issues Table

| Field | Type |
|---|---|
| id | Serial |
| title | VARCHAR |
| description | TEXT |
| type | VARCHAR |
| status | VARCHAR |
| reporter_id | INTEGER |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

# ☁️ Deployment

| Service | Platform |
|---|---|
| Backend Hosting | Render |
| Database Hosting | Neon PostgreSQL |

---

# 👨‍💻 Author

## Zarif Hasan

GitHub:

```bash
https://github.com/Zarif207
```

---

# 📜 License

This project is developed for educational and portfolio purposes.
