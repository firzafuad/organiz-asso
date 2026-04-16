import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthPage from './pages/AuthPage.jsx'
import MainPage from './pages/MainPage.jsx'
import Init from './pages/Init.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainPage />
  </StrictMode>,
)
