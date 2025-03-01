# 🚀 User Management System

A full-stack **User Management System** built with **React.js**, **Spring Boot**, **JWT Authentication**, and **PostgreSQL**. This project offers a secure and efficient way to manage user accounts, including authentication, adding users, and listing users with search functionality.

![Project Screenshot](https://github.com/Vishal-1007/User-Management-System/blob/main/git1.png)

---

## 🎯 Features
### **Frontend (React.js)**
✅ **Home Page** – Navigation to Add User & List Users  
✅ **Add User** – Form validation & user creation  
✅ **List Users** – Dynamic search functionality  
✅ **Secure API Calls** – Uses JWT authentication  

### **Backend (Spring Boot)**
✅ **User Authentication** – JWT-based security  
✅ **RESTful APIs** – For user CRUD operations  
✅ **Database Storage** – PostgreSQL for secure data handling  

---

## 🛠 Tech Stack
### **Frontend**
- ⚛️ **React.js** – UI Development
- 🎨 **Bootstrap** – Styling & UI components
- 🔗 **Axios** – API Requests
- 🚏 **React Router** – Navigation
- 🔔 **React Toastify** – Notifications

### **Backend**
- ☕ **Spring Boot** – Backend API
- 🔐 **Spring Security & JWT** – Authentication & Security
- 🗄 **PostgreSQL** – Database
- 📡 **Spring Data JPA** – Database operations
- 🛠 **Postman** – API Testing

---

## 📸 Screenshots
![Home Page](https://github.com/Vishal-1007/User-Management-System/blob/main/home.png)
![User List](https://github.com/Vishal-1007/User-Management-System/blob/main/list.png)

---

## 🚀 Getting Started
### **Backend Setup (Spring Boot)**
#### 📌 **1. Configure PostgreSQL**
Ensure PostgreSQL is installed and running. Then, create a database:
```sql
CREATE DATABASE user_management;
```

#### 📌 **2. Update `application.properties`**
Modify database details in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/user_management
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update
spring.security.jwt.secret=your_jwt_secret
```

#### 📌 **3. Run the Spring Boot Application**
```sh
mvn spring-boot:run
```
The server will start at **[http://localhost:8000](http://localhost:8000)**.

---

### **Frontend Setup (React.js)**
#### 📌 **1. Navigate to Frontend Directory**
```sh
cd frontend
```
#### 📌 **2. Install Dependencies**
```sh
npm install
```
#### 📌 **3. Run React App**
```sh
npm start
```
The app will run at **[http://localhost:3001](http://localhost:3001)** (since port 3000 is in use).

---

## 🔥 API Endpoints (Test in Postman)
### **Authentication API**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/login` | Authenticate user & get JWT token |

### **User Management API**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/users/add` | Add a new user (JWT required) |
| POST | `/users/search` | Search users dynamically (JWT required) |

---

## 📂 Project Structure
### **Backend (Spring Boot)**
```
src/
│── main/
│   ├── java/com/project/
│   │   ├── config/ (JWT & Security Config)
│   │   ├── controllers/ (REST APIs)
│   │   ├── models/ (User Model)
│   │   ├── repositories/ (Database Queries)
│   │   ├── services/ (Business Logic)
│   ├── resources/
│       ├── application.properties (DB Config)
```

### **Frontend (React.js)**
```
src/
│── components/
│   ├── Home.js
│   ├── AddUser.js
│   ├── ListUser.js
│── assets/ (Images & Icons)
│── css/ (Stylesheets)
│── App.js (Routes)
│── index.js (Entry Point)
```

---

## 🔐 Security & Authentication
- 🔑 **JWT Token-based authentication**
- 🔒 **Secure API endpoints using Authorization header**
- 🔐 **Password encryption using BCrypt**

---

## 📌 Future Improvements
🚀 **Role-based authentication**  
📊 **Pagination for user listing**  
🎨 **Enhanced UI design**  

---

## 👤 Contributor
**Vishal Gupta**  
🔗 [Portfolio](https://vishal-1007.github.io/Portfolio/)

---

🚀 *Feel free to contribute, open issues, or suggest improvements!*

