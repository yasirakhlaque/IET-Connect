import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Profile from './pages/profile';
import ForgotPassword from './components/ForgotPassword';
import Download from './pages/Download';
import SubjectDetail from './pages/SubjectDetail';
import GuestRoute from './components/GuestRoute';

import { createContext, useState } from 'react';
import Upload from './pages/Upload';

export const SignUpContext = createContext();
export const ThemeContext = createContext("dark");

function App() {
  const [isUploadActive, setIsUploadActive] = useState(false);
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
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </SignUpContext.Provider>
  );
}

export default App;
