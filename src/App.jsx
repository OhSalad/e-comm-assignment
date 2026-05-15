import { useEffect, useState } from 'react';
import { AddGradePage } from './components/AddGradePage.jsx';
import { GetGradePage } from './components/GetGradePage.jsx';
import { HomePage } from './components/HomePage.jsx';
import { MasterPage } from './components/MasterPage.jsx';

const routes = {
  '/': 'home',
  '/getGrade': 'getGrade',
  '/addGrade': 'addGrade'
};

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const currentPage = routes[path] || 'home';

  const navigate = (nextPath) => {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
  };

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);

    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <MasterPage currentPath={path} onNavigate={navigate}>
      {currentPage === 'home' && <HomePage onNavigate={navigate} />}

      {currentPage === 'getGrade' && <GetGradePage onNavigate={navigate} />}
      {currentPage === 'addGrade' && <AddGradePage onNavigate={navigate} />}
    </MasterPage>
  );
}
