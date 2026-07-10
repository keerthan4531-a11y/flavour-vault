// IndexedDB utility for recipe storage

import { openDB, type IDBPDatabase } from 'idb';
import { DB_NAME, DB_VERSION, RECIPE_STORE } from './constants';
import type { Recipe } from '../types/recipe';

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(RECIPE_STORE)) {
          const store = db.createObjectStore(RECIPE_STORE, { keyPath: 'id' });
          store.createIndex('category', 'category');
          store.createIndex('cuisine', 'cuisine');
          store.createIndex('diet', 'diet');
          store.createIndex('isFavorite', 'isFavorite');
          store.createIndex('createdAt', 'createdAt');
        }
      },
    });
  }
  return dbPromise;
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const db = await getDB();
  return db.getAll(RECIPE_STORE);
}

export async function getRecipeById(id: string): Promise<Recipe | undefined> {
  const db = await getDB();
  return db.get(RECIPE_STORE, id);
}

export async function addRecipe(recipe: Recipe): Promise<string> {
  const db = await getDB();
  await db.put(RECIPE_STORE, recipe);
  return recipe.id;
}

export async function updateRecipe(recipe: Recipe): Promise<void> {
  const db = await getDB();
  await db.put(RECIPE_STORE, recipe);
}

export async function deleteRecipe(id: string): Promise<void> {
  const db = await getDB();
  await db.delete(RECIPE_STORE, id);
}

export async function toggleFavorite(id: string): Promise<boolean> {
  const db = await getDB();
  const recipe = await db.get(RECIPE_STORE, id);
  if (recipe) {
    recipe.isFavorite = !recipe.isFavorite;
    recipe.updatedAt = Date.now();
    await db.put(RECIPE_STORE, recipe);
    return recipe.isFavorite;
  }
  return false;
}

export async function getFavoriteRecipes(): Promise<Recipe[]> {
  const db = await getDB();
  return db.getAllFromIndex(RECIPE_STORE, 'isFavorite', IDBKeyRange.only(true));
}

export async function getRecipesByCategory(category: string): Promise<Recipe[]> {
  const db = await getDB();
  return db.getAllFromIndex(RECIPE_STORE, 'category', category);
}

export async function incrementViewCount(id: string): Promise<void> {
  const db = await getDB();
  const recipe = await db.get(RECIPE_STORE, id);
  if (recipe) {
    recipe.viewCount = (recipe.viewCount || 0) + 1;
    await db.put(RECIPE_STORE, recipe);
  }
}

export async function seedSampleRecipes(sampleRecipes: Recipe[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(RECIPE_STORE, 'readwrite');
  for (const recipe of sampleRecipes) {
    const existingRecipe = await tx.store.get(recipe.id);
    if (!existingRecipe) {
      await tx.store.put(recipe);
    }
  }
  await tx.done;
}
