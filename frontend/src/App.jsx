import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage.jsx'
import MainPage from './pages/MainPage.jsx'
import './App.css'
import ProfilePage from './pages/ProfilePage.jsx'
import AdminPage from './pages/AdminPage.jsx';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<AuthPage form="login"/>} />
      <Route path="/signup" element={<AuthPage form="signup"/>} />
      <Route path="/profile/:username" element={<ProfilePage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}

export default App;
