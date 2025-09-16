// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NewReportPage from './pages/NewReportPage';
import ReportDetailsPage from './pages/ReportDetailsPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/report/new" element={<NewReportPage />} />
          <Route path="/report/:id" element={<ReportDetailsPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;