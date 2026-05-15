import { useState } from 'react';
import { apiUrl } from '../api.js';
import { StudentNumberSelect } from './StudentNumberSelect.jsx';

export function GetGradePage({ onNavigate }) {
  const [studentNumber, setStudentNumber] = useState('1');
  const [grades, setGrades] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    setGrades([]);

    try {
      const response = await fetch(apiUrl(`/getGrade?studentNumber=${studentNumber}`));
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not find grades.');
      }

      setGrades(data.grades);
      setMessage(
        data.grades.length
          ? `Showing grades for student ${data.studentNumber}.`
          : `No grades found for student ${data.studentNumber}.`
      );
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="panel">
      <button className="back-button" type="button" onClick={() => onNavigate('/')}>
        Back to Master Page
      </button>

      <div className="section-heading">
        <h1>Find Student Grades</h1>
        <p>Enter a student number from 1 to 5 to view previous courses and marks.</p>
      </div>

      <form className="tool-form" onSubmit={handleSubmit}>
        <StudentNumberSelect
          id="search-student-number"
          value={studentNumber}
          onChange={setStudentNumber}
        />
        <button className="primary-button" disabled={isLoading} type="submit">
          {isLoading ? 'Searching...' : 'Get Grade'}
        </button>
      </form>

      {message && <p className="status-message">{message}</p>}

      {grades.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Mark</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade) => (
                <tr key={grade.id}>
                  <td>{grade.courseName}</td>
                  <td>{grade.mark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
