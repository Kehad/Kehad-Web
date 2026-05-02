import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './app/globals.css'
import { ThemeProvider } from "./components/providers/ThemeProvider"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
