import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RoadmapPage } from './pages/RoadmapPage'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoadmapPage />
  </StrictMode>,
)
