import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AuthPage from './pages/AuthPage.jsx'
import MainPage from './pages/MainPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import AdminPage from './pages/AdminPage.jsx';

import './App.css'

function App() {
const [user, setUser] = useState(null);
console.log("USER:", user);
useEffect(() => {
  fetch("http://localhost:8000/auth/me", {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => setUser(data.user))
    .catch(() => setUser(null));
}, []);

if (!user) return <div>Loading...</div>;


  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<AuthPage form="login"/>} />
      <Route path="/signup" element={<AuthPage form="signup"/>} />
      <Route path="/profile/:username" element={<ProfilePage />} />
      <Route path="/admin" element={user?.role === "admin" ? (<AdminPage />) : (<MainPage />)}/>
    </Routes>
  )
}

export default App;
