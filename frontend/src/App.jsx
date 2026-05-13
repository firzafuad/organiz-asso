import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage.jsx'
import MainPage from './pages/MainPage.jsx'
import './App.css'

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<AuthPage form="login"/>} />
      <Route path="/signup" element={<AuthPage form="signup"/>} />
    </Routes>
  )
}

export default App;
