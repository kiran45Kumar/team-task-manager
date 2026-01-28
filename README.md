Team Task Manager (Mini Version)

A role-based task management application built using the MERN stack.
This project demonstrates authentication, authorization, CRUD operations, and clean backend/frontend architecture.

Features
"Authentication":

1. User Registration & Login

2. JWT-based authentication

3. Password hashing using bcrypt

4. Logout functionality

5. Protected routes

"Role-Based Access":

A. User

  1. Manage own tasks only

  2.View personal dashboard

B. Admin

    1. View all users

    2. Activate / Deactivate users

    3.View all tasks

    4. Admin dashboard with stats

"User Management (Admin)"

1. View all users

2. Activate / Deactivate users

"User Fields"

1. name

2. email

3. role (admin | user)

4. isActive

"Task Management"

Each user can manage their own tasks.

A. Task Fields

1. title

2. description

3. status (todo | in-progress | done)

4. dueDate

5. createdBy

"Features"

1. Create task

2. Update task

3. Delete task

4. View own tasks

5. Admin can view all tasks

Dashboards
A. User Dashboard

    1. Total tasks

    2. Pending tasks

B. Admin Dashboard

    1. Total users

    2. Total tasks


"Tech Stack"
Backend

1. Node.js

2. Express.js

3. MongoDB Atlas

4. Mongoose

5. JWT (JSON Web Tokens)

6. bcrypt

"Frontend"

1. React (Hooks)

2. Axios

3. React Router DOM


Backend Folder Structure: 
backend/
│── controllers/
│── models/
│── routes/
│── middlewares/
│── config/
│── server.js


Frontend Folder Structure: 
frontend/
│── src/
│   │── api/
│   │── components/
│   │── pages/
│   │── routes/
│   │── App.jsx
│   │── main.jsx

"Security Measures"

1. Passwords are hashed using bcrypt

2. JWT tokens with expiration

3. Protected APIs using middleware

4. Role-based authorization enforced in backend

5. Passwords are never returned in API responses

Environment Variables
Create a .env file in the backend folder:

PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d


How to Run the Project:

Backend:
cd backend
npm install
npm run dev

Frontend:
cd frontend
npm install
npm run dev

API Overview(Sample): 
Method	Endpoint	         Access	    Description
POST	/api/auth/register	 Public	        Register user
POST	/api/auth/login	     Public	        Login user
GET	    /api/tasks	         User/Admin	    Get tasks
POST	/api/tasks	         User	        Create task
PUT	    /api/tasks/:id	     Owner/Admin	Update task
DELETE	/api/tasks/:id	     Owner/Admin	Delete task
GET	    /api/admin/users	 Admin	        Get all users
PATCH	/api/admin/users/:id Admin	        Activate/Deactivate user


Testing

1. APIs tested using Postman

2. Frontend tested manually via UI

3. Auth & role checks verified

Objective of the Project

This project was built as a technical assessment to evaluate:

2. Ability to build a MERN app quickly

3. Authentication & authorization implementation

4. Clean and maintainable code structure

5. Role-based access control

6. Basic security practices

Author

Kiran
Backend / Full Stack Developer
GitHub: https://github.com/kiran45Kumar/team-task-manager

Status

1. Backend Completed
2. Frontend Completed
3. Authentication & Authorization Implemented
4. Ready for Review / Assessment Submission