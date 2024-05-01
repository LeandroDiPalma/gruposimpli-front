import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import DealersList from './pages/Dealers';
import VehiclesList from './pages/Vehicles';
import AccessoriesList from './pages/Accessories';
import PostsList from './pages/Posts';
import LeadsList from './pages/Leads';
import './App.css';
import './styles/output.css'
import { DealerProvider } from './context/DealerContext';
import { NotificationProvider } from './context/NotificationContext';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    setAuthToken(localStorage.getItem('token'));
  }, [authToken]);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  return (
    <DealerProvider>
      <NotificationProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/login" element={!authToken ? <LoginForm onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" />} />
                <Route path="/" element={authToken ? <DealersList /> : <Navigate to="/login" />} />
                <Route path="/dealers/:dealerId/vehicles" element={authToken ? <VehiclesList /> : <Navigate to="/login" />} />
                <Route path="/dealers/:dealerId/accessories" element={authToken ? <AccessoriesList /> : <Navigate to="/login" />} />
                <Route path="/dealers/:dealerId/posts" element={authToken ? <PostsList /> : <Navigate to="/login" />} />
                <Route path="/dealers/:dealerId/leads" element={authToken ? <LeadsList /> : <Navigate to="/login" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </NotificationProvider>
    </DealerProvider>

  );
}

export default App;
