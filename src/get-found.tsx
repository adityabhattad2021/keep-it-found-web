import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { GetFoundPage } from './pages/GetFoundPage'
import './styles.css'
import './get-found.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GetFoundPage />
  </StrictMode>,
)
