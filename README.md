# Mind Teams Challenge
Mind Teams Challenge "Administración de operación"


This project aims to showcase my expertise as a software engineer using modern technologies for both backend (Node.js, Express, MongoDB, Swagger, Jest) and frontend (React, Bootstrap 5, Redux), along with TypeScript. I had a deadline of two weeks to develop a comprehensive full-stack application for managing users, accounts, and logs, with different role-based access (admin, super_admin, user). The application has been secured using JWT, with proper authorization and authentication mechanisms in place. It adheres to best practices for RESTful APIs, demonstrates a clear separation of concerns, and is well tested with high test coverage.

Features
  User authentication with JWT
  Role-based access control (Super Admin, Admin, User)
  CRUD operations for Users, Accounts, and Transfers logs
  Unit tests and code coverage
  API documentation with Swagger
  React frontend with TypeScript
  Redux, React Router, and Bootstrap 5 integration


Getting Started
  Currently, I have not yet completed the implementation of the DevOps requirements. Therefore, you will need to have Node.js and MongoDB installed on your system to run the application.

Prerequisites
  Node.js
  npm
  MongoDB

Installation
  cd server
  npm install


Create a .env file in the project root and set the required environment variables:

  MONGO_URI=mongodb://localhost:27017/mind
  JWT_SECRET=secret_mind
  PORT=3000
  API_VERSION="1"

Run the seed file to have data for testing
  npm run seed

In order to run the server
  npm run dev

For the client side
  cd client
  npm install
  npm run start

Access the application in your browser at http://localhost:3001

for acces to swagger documentation go to http://localhost:3000/api-docs/

and finally to run tests coverage run
  npm run test

TODO`S

- [ ] Implement pagination for large datasets
- [ ] Improve styling and layout
- [ ] Implement real-time updates using WebSockets
