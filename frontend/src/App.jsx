import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ForgotPassword from './components/ForgotPassword';
import Download from './pages/Download';
import SubjectDetail from './pages/SubjectDetail';
import GuestRoute from './components/GuestRoute';
import Upload from './pages/Upload';
import NotFound from './pages/NotFound';

import { createContext, useState } from 'react';

export const SignUpContext = createContext();
export const ThemeContext = createContext("dark");

function App() {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");


  return (
    <SignUpContext.Provider value={{ isSignUpActive, setIsSignUpActive }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Router>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route
              path='/login'
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route path='/profile' element={<Profile />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/download' element={<Download />} />
            <Route path='/subject/:subjectId' element={<SubjectDetail />} />
            <Route path='/upload' element={<Upload />} />
            {/* 404 Catch-all route - must be last */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </SignUpContext.Provider>
  );
}

export default App;
