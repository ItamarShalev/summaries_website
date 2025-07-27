import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import IndexRoutes from './routes/index'
import './index.css'
// Initialize i18n for multi-language support
import './locales';
import i18n from './locales';

const lang = i18n.language;
document.documentElement.lang = lang;
document.documentElement.dir = (lang === 'he') ? 'rtl' : 'ltr';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <IndexRoutes />
    </BrowserRouter>
  </React.StrictMode>
)
