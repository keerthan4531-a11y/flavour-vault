// Router configuration

import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { LandingPage } from './pages/LandingPage';
import { RecipesPage } from './pages/RecipesPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { AddRecipePage } from './pages/AddRecipePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SearchPage } from './pages/SearchPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AIKitchenPage } from './pages/AIKitchenPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'recipes', element: <RecipesPage /> },
      { path: 'recipes/:id', element: <RecipeDetailPage /> },
      { path: 'add-recipe', element: <AddRecipePage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'ai-kitchen', element: <AIKitchenPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
