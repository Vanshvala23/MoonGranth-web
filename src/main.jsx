import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' 
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MoolProvider } from './context/MoolContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
      <MoolProvider> 
        <App />
      </MoolProvider>
    </BrowserRouter>
  </StrictMode>,
)
