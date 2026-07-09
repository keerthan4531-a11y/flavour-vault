// Main entry point

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { RecipeProvider } from './context/RecipeContext';
import { ToastProvider } from './components/ui/Toast';
import { router } from './router';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RecipeProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </RecipeProvider>
    </ThemeProvider>
  </StrictMode>,
);
