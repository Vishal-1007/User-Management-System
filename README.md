User Management System 🚀
A full-stack User Management System built with React.js, Spring Boot, JWT Authentication, and PostgreSQL. This project provides a secure and efficient way to manage user accounts, including user authentication, adding users, and listing users with search functionality.
![Project Screenshot](https://github.com/Vishal-1007/Jarvis-Chatbot/blob/main/Jarvis.png)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

Tech Stack
Frontend:
React.js – UI development
Bootstrap – Styling and UI components
Axios – API requests
React Router – Navigation
React Toastify – Notifications

Backend:
Spring Boot – Backend API
Spring Security & JWT – Authentication and security
PostgreSQL – Database
Spring Data JPA – Database operations
Postman – API testing
Features
Frontend (React.js)
✅ Home Page: Navigation to Add User and List Users
✅ Add User: Form validation and user creation
✅ List Users: Search users dynamically
✅ Secure API calls with JWT authentication

Backend (Spring Boot)
✅ User Authentication with JWT
✅ RESTful APIs for CRUD operations
✅ Secure user data storage using PostgreSQL

2. Backend Setup (Spring Boot)
a) Configure PostgreSQL
Ensure PostgreSQL is installed and running.
Create a database:
sql
Copy
Edit
CREATE DATABASE user_management;
b) Update application.properties
Modify database details in src/main/resources/application.properties:

properties
Copy
Edit
spring.datasource.url=jdbc:postgresql://localhost:5432/user_management
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update
spring.security.jwt.secret=your_jwt_secret
c) Run the Spring Boot Application
bash
Copy
Edit
mvn spring-boot:run
The server will start at http://localhost:8000

3. Frontend Setup (React.js)
a) Navigate to Frontend Directory
bash
Copy
Edit
cd frontend
b) Install Dependencies
bash
Copy
Edit
npm install
c) Run React App
bash
Copy
Edit
npm start
The app will run at http://localhost:3000

API Endpoints (Test in Postman)
Authentication API
Method	Endpoint	Description
POST	/api/auth/login	Authenticate user and get JWT token
User Management API
Method	Endpoint	Description
POST	/users/add	Add a new user (JWT required)
POST	/users/search	Search users based on input (JWT required)
Project Structure
Backend (Spring Boot)
css
Copy
Edit
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
Frontend (React.js)
pgsql
Copy
Edit
src/
│── components/
│   ├── Home.js
│   ├── AddUser.js
│   ├── ListUser.js
│── assets/ (Images & Icons)
│── css/ (Stylesheets)
│── App.js (Routes)
│── index.js (Entry Point)
Security & Authentication
JWT Token-based authentication
Secure endpoints using Authorization header
Password encryption using BCrypt
Future Improvements
Add role-based authentication
Implement pagination in user listing
Improve UI styling

Contributor
👤 Vishal Gupta
https://vishal-1007.github.io/Portfolio/
This README.md provides a complete overview of your project. Let me know if you want any modifications! 🚀

