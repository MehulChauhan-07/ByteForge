

<!-- ```markdown -->
# ☕ ByteForge – Beginner-Friendly Java Learning Platform

**Empower your Java journey with an interactive, AI-driven, real-time coding experience.**

![Build Status](https://img.shields.io/badge/status-active-brightgreen)  
![License](https://img.shields.io/badge/license-MIT-blue)  
![Last Updated](https://img.shields.io/badge/Updated-May%202025-blue)  

---

## 🚀 Introduction

**ByteForge** is a modern, beginner-focused Java learning platform designed to make Java programming accessible, engaging, and hands-on. With a built-in code editor, real-time compiler, smart note-taking system, and an AI chatbot tutor, ByteForge simplifies complex Java concepts and promotes practical learning through interaction and feedback.

---

## 🌟 Mission Statement

To bridge the gap between theory and practice in Java education by delivering:
- 📚 **Structured lessons**
- 🧪 **Real-time coding**
- 🧠 **AI-powered assistance**
- 📝 **Interactive note-taking**
- 📈 **Progress tracking**

---

## 👨‍💻 User Journey

1. **Start Learning** – Follow structured Java tutorials
2. **Code in Real-Time** – Practice inside an integrated Java editor
3. **Ask for Help** – Use the AI chatbot for concept clarifications
4. **Take Notes** – Save important code snippets and notes
5. **Track Progress** – View completion status and learning paths

---

## 🎮 Demo

🖼️ Screenshots and walkthroughs will be added post first release.

---

## 🛠️ Features

### 🎯 Frontend – *React + Vite + TypeScript*
- **Monaco Editor** – Live Java code editing and execution  
- **AI Chatbot** – Friendly assistant based on Spring AI & Gemini  
- **Notes Manager** – Save and organize personal notes  
- **Learning Dashboard** – Track topic-wise progress  
- **Responsive UI** – Optimized for all screen sizes (TailwindCSS + DaisyUI + ShadCN)

### ⚙️ Backend – *Spring Boot + Docker + SQL*
- **JWT/OAuth Auth** – Secure login and session management  
- **Dockerized Code Execution** – Isolated, secure Java compilation  
- **Quiz Engine** – AI-generated MCQs with scoring and review  
- **User Profiles** – Track sessions, submissions, and notes  
- **RESTful APIs** – For content delivery, auth, quiz, and compilation

---

## 📚 Learning Resources

- 📘 **Java Basics to Advanced** – Gradual and structured tutorials  
- 🧩 **Interactive Exercises** – Validate understanding on the go  
- 🧠 **Quizzes** – Auto-generated Java MCQs with instant feedback  
- 💾 **Code Snippets Library** – Useful examples for reference

---

## 🧪 Architecture & Codebase

ByteForge is structured into microservices for:
- `Authentication` (Spring Boot + JWT)
- `Code Execution` (Docker-secured Java runtime)
- `Quiz System` (AI quiz generation and evaluation)
- `Content & Notes` (Express.js + MongoDB)
- `Frontend SPA` (React + Vite + TypeScript)

> Explore the [Implementation Details](#) in the wiki for class diagrams, sequence flows, and more.

---

## 📌 Tech Stack

### Frontend
- React, Vite, TypeScript  
- Tailwind CSS, DaisyUI, ShadCN  
- Monaco Editor  

### Backend
- Spring Boot (Java 17+)  
- Express.js (for content service)  
- MySQL & MongoDB  
- Docker + Docker Compose  
- Spring AI, Gemini, OpenAI (for Chatbot)

---

## 💻 System Requirements

### For Users
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection

### For Developers
- Node.js 16+  
- Java 17+  
- Docker  
- 4 GB RAM, 10 GB free disk  
- PostgreSQL or MySQL database  

---

## ⚙️ Setup & Installation

### 🔧 Frontend
```bash
cd byteforge-frontend
npm install
npm run dev
```

### ⚙️ Backend (Spring Boot)
```bash
cd byteforge-backend
mvn clean install
mvn spring-boot:run
```

### 🐳 Run Entire Stack with Docker
```bash
docker-compose up --build
```

---

## 🔐 Security Considerations

ByteForge uses strict sandboxing and security measures:
- Docker-based isolated code execution  
- Memory/CPU/process limitations  
- Encrypted user data at rest and in transit  
- OAuth + JWT for authentication  

---

## 📅 Roadmap

| Feature | Status | ETA |
|--------|--------|-----|
| Code Editor & Compiler | ✅ | Done |
| AI Chatbot | ✅ | Done |
| Learning Path Progress | ✅ | Done |
| Quizzes & Evaluation | ✅ | Done |
| Cloud Deployment | 🛠 | Q4 2025 |
| Community Learning Modules | 🛠 | Q1 2026 |
| Mobile App | 🔜 | Planned |

---

## 🤝 Contributors

👨‍🎓 **Team-11**  
- **Mehulsinh Chauhan** – Frontend Lead  
- **Akash Panchal** – Educational Content Designer  
- **Rana** – Backend Engineer  

> We ❤️ collaboration. Contributions are welcome!

---

## 💬 Contributing

```bash
# Fork & clone the repo
git checkout -b feature/amazing-feature
# Make your changes
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
# Open a Pull Request 🚀
```

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for full details.

---

## 📝 License

This project is licensed under the **MIT License**.  
See [`LICENSE`](LICENSE) for details.

---

## 📞 Contact

📬 Reach out to **Mehulsinh Chauhan** for any project-related queries.

---

> 🌱 *"Don't just read Java. Live it, code it, and grow with ByteForge."*