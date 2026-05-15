export function HomePage({ onNavigate }) {
  return (
    <section className="home-dashboard">
      <div className="home-heading">
        <h1>What would you like to do?</h1>
        <p>Choose an admin task to manage student grades.</p>
      </div>

      <div className="action-grid">
        <article className="action-card">
          <div>
            <h2>Find Student Grades</h2>
            <p>View previous courses and marks for students 1-5.</p>
          </div>
          <button className="primary-button" type="button" onClick={() => onNavigate('/getGrade')}>
            Open Grade Search
          </button>
        </article>

        <article className="action-card">
          <div>
            <h2>Add Grade</h2>
            <p>Add a new course mark for a selected student.</p>
          </div>
          <button className="primary-button" type="button" onClick={() => onNavigate('/addGrade')}>
            Open Add Form
          </button>
        </article>
      </div>
    </section>
  );
}
