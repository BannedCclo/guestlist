import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lista from './lista.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Lista />
  </StrictMode>,
)
