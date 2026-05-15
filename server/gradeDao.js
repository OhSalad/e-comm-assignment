import { all, get, run } from './database.js';

const seedGrades = [
  [1, 'Web Development', 91],
  [1, 'Database Systems', 86],
  [1, 'Business Analytics', 78],
  [2, 'E-Commerce', 88],
  [2, 'JavaScript Fundamentals', 94],
  [3, 'Networking', 81],
  [3, 'Cybersecurity Basics', 89],
  [4, 'Software Engineering', 76],
  [4, 'Human Computer Interaction', 84],
  [5, 'Mobile Applications', 92],
  [5, 'Cloud Computing', 87]
];

export async function initializeDatabase() {
  await run(`
    CREATE TABLE IF NOT EXISTS grades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_number INTEGER NOT NULL CHECK(student_number BETWEEN 1 AND 5),
      course_name TEXT NOT NULL,
      mark INTEGER NOT NULL CHECK(mark BETWEEN 0 AND 100),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const existing = await get('SELECT COUNT(*) AS count FROM grades');
  if (existing.count === 0) {
    for (const grade of seedGrades) {
      await addGrade({
        studentNumber: grade[0],
        courseName: grade[1],
        mark: grade[2]
      });
    }
  }
}

export async function findGradesByStudentNumber(studentNumber) {
  return all(
    `
      SELECT
        id,
        student_number AS studentNumber,
        course_name AS courseName,
        mark,
        created_at AS createdAt
      FROM grades
      WHERE student_number = ?
      ORDER BY course_name ASC
    `,
    [studentNumber]
  );
}

export async function addGrade({ studentNumber, courseName, mark }) {
  if (!Number.isInteger(mark) || mark < 0 || mark > 100) {
    throw new Error('Invalid mark. Mark must be an integer from 0 to 100.');
  }

  return run(
    `
      INSERT INTO grades (student_number, course_name, mark)
      VALUES (?, ?, ?)
    `,
    [studentNumber, courseName.trim(), mark]
  );
}
