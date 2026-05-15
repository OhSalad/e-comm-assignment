import { useState } from 'react';
import { apiUrl } from '../api.js';
import { StudentNumberSelect } from './StudentNumberSelect.jsx';

const initialForm = {
  studentNumber: '1',
  courseName: '',
  mark: ''
};

export function AddGradePage({ onNavigate }) {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      const response = await fetch(apiUrl('/addGrade'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not add grade.');
      }

      setMessage(`${data.grade.courseName} was added for student ${data.grade.studentNumber}.`);
      setForm(initialForm);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="panel">
      <button className="back-button" type="button" onClick={() => onNavigate('/')}>
        Back to Master Page
      </button>

      <div className="section-heading">
        <h1>Add Grade</h1>
        <p>Add a course and mark for any student number from 1 to 5.</p>
      </div>

      <form className="stacked-form" onSubmit={handleSubmit}>
        <StudentNumberSelect
          id="add-student-number"
          value={form.studentNumber}
          onChange={(value) => updateField('studentNumber', value)}
        />

        <label className="field" htmlFor="course-name">
          <span>Course name</span>
          <input
            id="course-name"
            name="courseName"
            onChange={(event) => updateField('courseName', event.target.value)}
            placeholder="Example: Data Structures"
            required
            type="text"
            value={form.courseName}
          />
        </label>

        <label className="field" htmlFor="mark">
          <span>Mark</span>
          <input
            id="mark"
            max="100"
            min="0"
            name="mark"
            onChange={(event) => updateField('mark', event.target.value)}
            placeholder="0-100"
            required
            type="number"
            value={form.mark}
          />
        </label>

        <button className="primary-button" disabled={isSaving} type="submit">
          {isSaving ? 'Saving...' : 'Add Grade'}
        </button>
      </form>

      {message && <p className="status-message">{message}</p>}
    </section>
  );
}
