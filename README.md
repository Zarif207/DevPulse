# DevPulse Backend API

A RESTful Issue Tracking Backend built with Express.js, TypeScript, PostgreSQL, and JWT Authentication.

Live API: https://devpulse-fa6e.onrender.com/

---

## Features

- JWT Authentication
- Role-based Authorization
- Create / Read / Update / Delete Issues
- PostgreSQL Database Integration
- Global Error Handling
- Protected Routes
- TypeScript Support
- Render Deployment
- Neon PostgreSQL Database

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Neon
- JWT
- bcrypt
- Render

---

## Project Structure

```bash
src
├── config
├── db
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
├── utils
│   └── sendResponse.ts
│
├── app.ts
└── server.ts
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Zarif207/DevPulse.git
```

### Move Into Project Directory

```bash
cd DevPulse
```

### Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=4000

DATABASE_URL=your_neon_database_url

JWT_SECRET=your_secret_key
```

---

## Run Project

### Development

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Production

```bash
npm start
```

---

# API Endpoints

## Root Route

### GET /

```json
DevPulse Server Running
```

---

# Authentication Routes

## User Registration

### POST /api/auth/signup

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
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "Zarif Hasan",
    "email": "zarif@gmail.com",
    "role": "contributor"
  }
}
```

---

## User Login

### POST /api/auth/login

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

# Issue Routes

## Create Issue

### POST /api/issues

### Headers

```bash
Authorization: your_jwt_token
```

### Request Body

```json
{
  "title": "Dark mode issue",
  "description": "Navbar breaks in dark mode during responsive view",
  "type": "bug"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Issue created successfully"
}
```

---

## Get All Issues

### GET /api/issues

### Query Parameters

```bash
/api/issues?sort=newest
/api/issues?type=bug
/api/issues?status=open
```

### Success Response

```json
{
  "success": true,
  "message": "Issues retrieved successfully"
}
```

---

## Get Single Issue

### GET /api/issues/:id

### Example

```bash
/api/issues/1
```

---

## Update Issue

### PATCH /api/issues/:id

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

### DELETE /api/issues/:id

### Headers

```bash
Authorization: your_jwt_token
```

---

# Authorization Roles

| Role        | Permissions                          |
| ------------| ------------------------------------ |
| contributor | Create and manage own issues        |
| maintainer  | Full access including delete issues |

---

# Validation Rules

## User Validation

- Email must be unique
- Password minimum length required
- Role must be contributor or maintainer

## Issue Validation

- Title maximum 150 characters
- Description minimum 20 characters
- Type must be:
  - bug
  - feature_request

---

# Error Handling

The API handles:

- Invalid Token
- Unauthorized Access
- Forbidden Access
- Validation Errors
- Route Not Found
- Database Errors
- Internal Server Errors

---

# Deployment

- Backend: Render
- Database: Neon PostgreSQL

---

# Live Deployment

```bash
https://devpulse-fa6e.onrender.com/
```

---

# GitHub Repository

```bash
https://github.com/Zarif207/DevPulse
```

---

# Author

## Zarif Hasan

GitHub:
https://github.com/Zarif207

---

# License

This project is created for educational and portfolio purposes.
