import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { SupportPage } from './pages/SupportPage'
import './styles.css'
import './document-pages.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SupportPage />
  </StrictMode>,
)
