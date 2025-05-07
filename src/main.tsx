
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use a try-catch block to catch any rendering errors
try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Could not find root element");
  }
  
  createRoot(rootElement).render(<App />);
} catch (error) {
  console.error("Failed to render application:", error);
  
  // Create a fallback UI if rendering fails
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h1>Something went wrong</h1>
        <p>The application failed to load. Please refresh the page.</p>
        <button onclick="window.location.reload()" style="padding: 8px 16px; margin-top: 20px;">
          Refresh Page
        </button>
      </div>
    `;
  }
}
