# Student Grade System

Student Grade System is a small admin project built with Node.js, ExpressJS, React, and SQLite3. Admins can search for a student's previous courses and marks, or add new grade records through a simple form.

## Requirements

Before running the project, make sure you have:

- Node.js installed
- npm installed
- A terminal opened in the project folder

## Install Dependencies

Run this command once:

```bash
npm install
```

## Start the Project

Run both the backend and frontend with:

```bash
npm start
```

This starts:

- Express backend: `http://localhost:3000`
- React frontend: `http://127.0.0.1:5173`

Open the React frontend in the browser:

```text
http://127.0.0.1:5173
```

## Available Pages

- `/` - Master page / admin dashboard
- `/getGrade` - Search for student courses and marks
- `/addGrade` - Add a new course grade

## API Endpoints

### Get Student Grades

```http
GET /getGrade?studentNumber=1
```

The student number must be from `1` to `5`.

### Add Student Grade

```http
POST /addGrade
```

Example JSON body:

```json
{
  "studentNumber": "1",
  "courseName": "Database Systems",
  "mark": "90"
}
```

## Database

The project uses SQLite3. The database file is created automatically at:

```text
server/student-system.sqlite
```

The database table is created automatically when the backend starts. Dummy student grade data is inserted the first time the database is created.

## Project Structure

```text
.
├── server
│   ├── database.js          # SQLite connection and helper functions
│   ├── gradeDao.js          # DAO layer for grade database operations
│   └── index.js             # Express server and API routes
├── src
│   ├── components
│   │   ├── AddGradePage.jsx
│   │   ├── GetGradePage.jsx
│   │   ├── HomePage.jsx
│   │   ├── MasterPage.jsx
│   │   └── StudentNumberSelect.jsx
│   ├── api.js               # Frontend API URL helper
│   ├── App.jsx              # Main React routing logic
│   ├── main.jsx             # React entry point
│   └── styles.css           # Application styling
├── index.html               # Vite HTML entry file
├── package.json             # npm scripts and dependencies
├── vite.config.js           # Vite React configuration and API proxy
└── README.md
```

## Main Technologies

- Node.js
- ExpressJS
- SQLite3
- React
- Vite

## Notes

- Use `npm start` to run both frontend and backend together.
- The React frontend calls backend routes through `/api`, and Vite proxies those requests to Express during development.