import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import TimelinePage from './pages/TimelinePage';
import MessagePage from './pages/MessagePage';
import WishesPage from './pages/WishesPage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/wishes" element={<WishesPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;