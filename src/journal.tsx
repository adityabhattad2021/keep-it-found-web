import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import { JournalApp } from './journal/JournalApp'
import './styles.css'

const root = document.getElementById('root')
if (!root) throw new Error('Journal root element is missing')

const app = (
  <StrictMode>
    <JournalApp pathname={window.location.pathname} />
  </StrictMode>
)

if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
