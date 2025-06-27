# 📚 StudyMate

> A fullstack learning assistant application that helps students generate optimal study schedules, manage their learning time, and connect with study peers.

---

## ✨ Features

- 📆 **Smart Study Planner**  
  Automatically generates study schedules based on:
  - Users’ free time  
  - Subject priority  
  - Max/min time per subject  
  - Study goals

- 🧠 **Constraint Optimization**  
  Uses constraint-based algorithms to arrange time slots for subjects optimally.

- 🧑‍🤝‍🧑 **Social Learning**  
  Make friends, chat with other learners, and study together in real time.

- 🔔 **Real-time Notification & Chat**  
  Chat system with Firebase Realtime DB and push notifications.

---

## 🛠 Tech Stack

| Layer         | Technology |
|---------------|------------|
| **Frontend**  | React Native (Expo) |
| **Backend**   | Spring Boot (Java) |
| **Database**  | MongoDB, Firebase Realtime Database |
| **Cloud**     | Cloudinary (image hosting), Firebase |
| **Authentication** | JWT, Firebase Auth |

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Java 17+ and Maven
- Node.js and npm
- MongoDB (local or Atlas)
- Firebase project setup

---

### 🔌 Backend Setup

```bash
cd backend
./mvnw clean install
java -jar target/studymate.jar
