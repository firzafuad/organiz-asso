import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage.jsx'
import MainPage from './pages/MainPage.jsx'
import './App.css'
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  return (
    <Routes>
      <Route path="/" element={<MainPage user={user} />} />
      <Route path="/login" element={<AuthPage form="login" onSuccess={(usr) => setUser(usr)} />} />
      <Route path="/signin" element={<AuthPage form="signin" onSuccess={(usr) => setUser(usr)} />} />
    </Routes>
  )
}

export default App
