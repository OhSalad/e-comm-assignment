import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  addGrade,
  findGradesByStudentNumber,
  initializeDatabase
} from './gradeDao.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distDir));

function validateStudentNumber(value) {
  const studentNumber = Number(value);

  if (!Number.isInteger(studentNumber) || studentNumber < 1 || studentNumber > 5) {
    return null;
  }

  return studentNumber;
}

function validateMark(value) {
  const mark = Number(value);

  if (!Number.isInteger(mark) || mark < 0 || mark > 100) {
    return null;
  }

  return mark;
}

function sendApp(req, res) {
  res.sendFile(path.join(distDir, 'index.html'));
}

app.get('/getGrade', async (req, res, next) => {
  if (!req.query.studentNumber) {
    sendApp(req, res);
    return;
  }

  const studentNumber = validateStudentNumber(req.query.studentNumber);
  if (!studentNumber) {
    res.status(400).json({ message: 'Student number must be between 1 and 5.' });
    return;
  }

  try {
    const grades = await findGradesByStudentNumber(studentNumber);
    res.json({ studentNumber, grades });
  } catch (error) {
    next(error);
  }
});

app.post('/addGrade', async (req, res, next) => {
  const studentNumber = validateStudentNumber(req.body.studentNumber);
  const courseName = String(req.body.courseName || '').trim();
  const mark = validateMark(req.body.mark);

  if (!studentNumber) {
    res.status(400).json({ message: 'Student number must be between 1 and 5.' });
    return;
  }

  if (!courseName) {
    res.status(400).json({ message: 'Course name is required.' });
    return;
  }

  if (mark === null) {
    res.status(400).json({ message: 'Mark must be an integer from 0 to 100.' });
    return;
  }

  try {
    const result = await addGrade({ studentNumber, courseName, mark });
    res.status(201).json({
      message: 'Grade added successfully.',
      grade: { id: result.id, studentNumber, courseName, mark }
    });
  } catch (error) {
    next(error);
  }
});

app.get(['/addGrade', '/'], sendApp);

app.use((req, res) => {
  if (req.accepts('html')) {
    sendApp(req, res);
    return;
  }

  res.status(404).json({ message: 'Not found' });
});

app.use((error, req, res, next) => {
  console.error(error);

  if (error.message?.startsWith('Invalid mark')) {
    res.status(400).json({ message: error.message });
    return;
  }

  res.status(500).json({ message: 'Something went wrong on the server.' });
});

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Student system running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });
