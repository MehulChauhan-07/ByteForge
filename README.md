# ByteForge

![ByteForge Logo](https://drive.google.com/file/d/1yxuyO4dLdaK_qVOkJU2QdS7Ec3i6plpm/view?usp=sharing)  
**An Online Java Learning Platform for Beginners**

## 🚀 Introduction

ByteForge is an interactive Java learning platform designed for beginners. It provides a hands-on experience with Java programming through an integrated code editor, notes management, and an AI-powered chatbot to assist learners. The platform aims to bridge the gap between theoretical Java concepts and practical implementation.

## 🛠 Features

### 🎯 Frontend (React + Vite + TypeScript)

- **Code Editor**: Integrated with **Monaco Editor**, enabling real-time Java coding
- **Notes Keeper**: Save, edit, and organize personal study notes
- **AI Chatbot**: Provides instant Java-related assistance using AI-powered responses
- **User-Friendly UI**: Built using **DaisyUI, Herui, and ShadCN** for an intuitive experience
- **Responsive Design**: Fully optimized for desktops and mobile devices

### ⚙️ Backend (Spring Boot + Docker + SQL)

- **Docker-Based Code Execution**: Secure Java code compilation in an isolated container
- **Database Management**: SQL-based user data storage for better scalability
- **RESTful APIs**: Efficient API communication between frontend and backend
- **Authentication**: Implements JWT/OAuth for secure user authentication
- **User Progress Tracking**: Tracks coding activity, submissions, and learning progress
- **Code Evaluation System**: Auto-grade Java programs and provide feedback

## 📌 Tech Stack

### Frontend

- React (Vite + TypeScript)
- DaisyUI, Herui, ShadCN
- Monaco Editor
- Tailwind CSS

### Backend

- Spring Boot
- Docker
- SQL Database (PostgreSQL/MySQL)
- REST API

### Additional Technologies

- JWT/OAuth Authentication
- Cloud Deployment (Future Enhancement)
- AI-based Chatbot System

## 📂 Project Structure

```
byteforge/
│── frontend/    # React frontend
│   │── src/     # Source code
│   │── public/  # Static assets
│   │── components/ # UI Components
│   │── pages/   # Page structure
│
│── backend/     # Spring Boot backend
│   │── src/     # Backend source code
│   │── config/  # Backend configurations
│   │── controllers/ # API Controllers
│
│── docs/        # Documentation
│── docker/      # Docker setup
│── README.md    # Project documentation
```

## 🎯 Setup & Installation

### Prerequisites

- Node.js & npm
- Java & Maven
- Docker & Docker Compose
- PostgreSQL/MySQL database setup

### 🔧 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### ⚙️ Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 🐳 Running with Docker

```bash
docker-compose up --build
```

## 📅 Roadmap

- [x] Implement core frontend functionalities (Editor, Notes, Chatbot)
- [x] Backend API for authentication & code execution
- [ ] Add AI-based auto-code suggestions
- [ ] Implement cloud-based deployment
- [ ] Introduce community-driven learning modules

## 🤝 Contributors

- **Mehulsinh Chauhan** - Frontend Developer
- **Akash Panchal** - Frontend Developer
- **Rana** - Backend Developer

## 📞 Contact

For queries, reach out to [Mehulsinh Chauhan](https://github.com/MehulChauhan-07).
