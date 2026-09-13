import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { FirstEditionTermsPage } from './pages/FirstEditionTermsPage'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirstEditionTermsPage />
  </StrictMode>,
)
