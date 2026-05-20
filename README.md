# 🚀 AI Task Manager

A full-stack intelligent task management web application that allows users to create, manage, and track tasks with AI-powered assistance.

---

## 📌 Features

### 👤 Authentication
- User Registration & Login
- JWT-based authentication
- Secure protected routes

### 📝 Task Management
- Create tasks manually
- View all tasks
- Update task details
- Delete tasks
- Change task status (TODO / IN_PROGRESS / DONE)

### 🤖 AI Integration
- AI-generated task descriptions
- Auto-suggest priority
- Estimated effort prediction

### 📊 Dashboard
- Task status overview
- TODO / IN_PROGRESS / DONE tracking

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router
- Tailwind CSS
- React Toastify

### Backend
- Spring Boot
- Spring Security (JWT)
- Hibernate / JPA

### Database
- MySQL

### AI Service
- Google Gemini API

---

📁 Project Structure

AI-TASK-MANAGER/
│
├── ai-task-manager-backend/
│ ├── controllers/
│ ├── services/
│ ├── entities/
│ ├── security/
│ └── application.properties
│
├── ai-task-frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ └── utils/
│
└── README.md

---

## ⚙️ Setup Instructions

### 🖥️ Backend Setup (Spring Boot)

cd ai-task-manager-backend

### Configure application.properties:

-spring.datasource.url=jdbc:mysql://localhost:3306/task_manager_db
-spring.datasource.username=root
-spring.datasource.password=your_password

-server.port=8081

-jwt.secret=your_secret_key
-jwt.expiration=86400000

-gemini.api.key=YOUR_API_KEY

Run backend:
-mvn spring-boot:run

Backend runs at:
http://localhost:8081

---

### 🌐 Frontend Setup (React)

cd ai-task-frontend

npm install

npm run dev

Frontend runs at:
http://localhost:5173

---

## 🔗 API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Tasks
- GET /api/tasks  
- POST /api/tasks  
- PUT /api/tasks/{id}  
- DELETE /api/tasks/{id}  
- PATCH /api/tasks/{id}/status  

### AI
- POST /api/ai/generate-task

---

## 👨‍💻 Author

Pravallika Pikkili -Pravallika968

---
