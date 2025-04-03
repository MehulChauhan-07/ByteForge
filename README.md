## <p align="left"><img src="byteforge-frontend/src/assets/logo/logo-light.svg" alt="ByteForge Logo" width="60" style="vertical-align: middle;">&nbsp; &nbsp;<b style="font-size: 2em; vertical-align: middle;">ByteForge</b></p>

<!-- # ByteForge -->

**An Online Java Learning Platform for Beginners**

## 🚀 Introduction

ByteForge is an interactive Java learning platform designed for beginners. It provides a hands-on experience with Java programming through an integrated code editor, notes management, and an AI-powered chatbot to assist learners. The platform aims to bridge the gap between theoretical Java concepts and practical implementation.

### 🌟 Mission Statement

ByteForge was created to make learning Java accessible, engaging, and effective for beginners. Many existing platforms focus either on theory without practice or on coding challenges without proper guidance. ByteForge uniquely combines structured learning, hands-on coding, and AI assistance to provide a comprehensive learning environment.

## 👨‍💻 User Journey

1. **Start Learning**: Begin with structured Java tutorials and concepts
2. **Practice in Real-Time**: Apply concepts immediately in the integrated code editor
3. **Get Help When Stuck**: Use the AI chatbot for instant assistance with code or concepts
4. **Take Notes**: Save important points and code snippets for future reference
5. **Track Progress**: Monitor your learning journey with the progress tracking system

## 🎮 Demo

<p align="center">
  <i>Screenshots/GIF of the platform will be added here after the first release</i>
</p>

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

### 📚 Learning Resources

- **Structured Tutorials**: Step-by-step guides covering Java basics to advanced concepts
- **Interactive Exercises**: Practice problems with increasing difficulty levels
- **Code Challenges**: Real-world coding scenarios to test and apply knowledge
- **Example Libraries**: Collection of example code snippets for reference

## 📌 Tech Stack

### Frontend

- React (Vite + TypeScript)
- DaisyUI, Herui, ShadCN
- Monaco Editor
- Tailwind CSS

### Backend

- Spring Boot
- Docker
- SQL Database (MySQL)
- REST API

### Additional Technologies

- JWT/OAuth Authentication
- Cloud Deployment (Future Enhancement)
- AI-based Chatbot System

## 💻 System Requirements

### For Users

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection

### For Developers

- Node.js 16+
- Java 17+
- Docker
- 4GB RAM minimum
- 10GB free disk space

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

## ❓ Troubleshooting

### Common Issues

1. **Docker container fails to start**: Ensure Docker is running and ports 8080, 3000 are available
2. **Compilation errors**: Make sure Java 17+ is installed and JAVA_HOME is set correctly
3. **Database connection issues**: Verify database credentials in application.properties

For more detailed troubleshooting, see our [Wiki page](https://github.com/username/byteforge/wiki).

## 🔒 Security Considerations

ByteForge implements several security measures:

- Docker-based code execution with resource limitations
- Network isolation for executed code
- Memory and CPU usage restrictions
- Process limits to prevent fork bombs
- Non-root user execution

## 📅 Roadmap

- [x] Implement core frontend functionalities (Editor, Notes, Chatbot)
- [x] Backend API for authentication & code execution
- [ ] Add AI-based auto-code suggestions (Expected: Q3 2025)
- [ ] Implement cloud-based deployment (Expected: Q4 2025)
- [ ] Introduce community-driven learning modules (Expected: Q1 2026)

## 🤝 Contributors

- **Mehulsinh Chauhan** - Frontend Developer
- **Akash Panchal** - Educational Content Designer
- **Rana** - Backend Developer

## 💬 Contributing

We welcome contributions to ByteForge! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For queries, reach out to [Mehulsinh Chauhan](https://github.com/MehulChauhan-07).
