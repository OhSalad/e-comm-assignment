const links = [
  { path: '/', label: 'Master Page' },
  { path: '/getGrade', label: 'Find Student Grades' },
  { path: '/addGrade', label: 'Add Grade' }
];

export function MasterPage({ children, currentPath, onNavigate }) {
  return (
    <div className="app-shell">
      <header className="admin-header">
        <div>
          <p className="eyebrow">Admin</p>
          <h2>Student System</h2>
        </div>

        <nav className="tabs" aria-label="Admin pages">
          {links.map((link) => (
            <button
              className={currentPath === link.path ? 'tab-link active' : 'tab-link'}
              key={link.path}
              onClick={() => onNavigate(link.path)}
              type="button"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="content">{children}</main>

      <footer className="app-footer">
        <div>
          <strong>Student Grade System</strong>
          <span>Admin Portal</span>
        </div>
        <p>Ahmad Al Dawood 202201115, 2026</p>
      </footer>
    </div>
  );
}
