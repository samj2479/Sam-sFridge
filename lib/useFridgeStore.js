'use client';

import { useState, useEffect, useCallback } from 'react';
import { getFridge, setFridge, getRecipes, setRecipes } from './storage';

// UI components call these mutation functions instead of touching
// storage.js directly. This is the seam to rewire when a real backend
// replaces localStorage.
export function useFridgeStore() {
  const [fridge, setFridgeState] = useState([]);
  const [recipes, setRecipesState] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      setFridgeState(await getFridge());
      setRecipesState(await getRecipes());
      setLoaded(true);
    })();
  }, []);

  const addFridgeItem = useCallback(({ name, qty }) => {
    setFridgeState(prev => {
      const next = [...prev, { id: Date.now(), name, qty }];
      setFridge(next);
      return next;
    });
  }, []);

  const removeFridgeItem = useCallback(id => {
    setFridgeState(prev => {
      const next = prev.filter(item => item.id !== id);
      setFridge(next);
      return next;
    });
  }, []);

  const addRecipe = useCallback(({ name, ingredients }) => {
    setRecipesState(prev => {
      const nextNum = prev.length > 0 ? Math.max(...prev.map(r => r.num)) + 1 : 1;
      const next = [...prev, { id: Date.now(), num: nextNum, name, ingredients }];
      setRecipes(next);
      return next;
    });
  }, []);

  const removeRecipe = useCallback(id => {
    setRecipesState(prev => {
      const next = prev.filter(r => r.id !== id);
      setRecipes(next);
      return next;
    });
  }, []);

  return { fridge, recipes, loaded, addFridgeItem, removeFridgeItem, addRecipe, removeRecipe };
}
