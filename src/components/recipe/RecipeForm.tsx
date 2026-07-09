// RecipeForm component — Add/Edit recipe form

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, ChevronDown, Sparkles, Loader2 } from 'lucide-react';
import type { Recipe, Ingredient, CookingStep, RecipeCategory, CuisineType, DietType } from '../../types/recipe';
import { CATEGORIES, CUISINES, DIETS } from '../../types/filter';
import { ImageUploader } from '../upload/ImageUploader';
import { generateId } from '../../utils/imageHelper';
import { autoTagRecipe } from '../../services/ai/autoTagger';

interface RecipeFormProps {
  initialData?: Recipe;
  onSubmit: (recipe: Recipe) => void;
  onCancel?: () => void;
}

export function RecipeForm({ initialData, onSubmit, onCancel }: RecipeFormProps) {
  const isEdit = !!initialData;

  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState<RecipeCategory>(initialData?.category || 'Lunch');
  const [cuisine, setCuisine] = useState<CuisineType>(initialData?.cuisine || 'Tamil');
  const [diet, setDiet] = useState<DietType>(initialData?.diet || 'Veg');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>(initialData?.difficulty || 'Easy');
  const [cookingTime, setCookingTime] = useState(initialData?.cookingTime || 30);
  const [prepTime, setPrepTime] = useState(initialData?.prepTime || 15);
  const [servings, setServings] = useState(initialData?.servings || 4);
  const [calories, setCalories] = useState(initialData?.calories || 0);
  const [tags, setTags] = useState(initialData?.tags.join(', ') || '');
  const [images, setImages] = useState<string[]>(initialData ? [initialData.coverImage, ...initialData.images.map(i => i.data)].filter(Boolean) : []);

  const [ingredients, setIngredients] = useState<Omit<Ingredient, 'id'>[]>(
    initialData?.ingredients.map(({ id, ...rest }) => rest) || [
      { name: '', quantity: '', unit: '', isOptional: false },
    ]
  );

  const [steps, setSteps] = useState<Omit<CookingStep, 'id'>[]>(
    initialData?.steps.map(({ id, ...rest }) => rest) || [
      { stepNumber: 1, instruction: '', duration: undefined, tip: '' },
    ]
  );

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '', isOptional: false }]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: string, value: any) => {
    setIngredients(
      ingredients.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing))
    );
  };

  const addStep = () => {
    setSteps([...steps, { stepNumber: steps.length + 1, instruction: '', duration: undefined, tip: '' }]);
  };

  const removeStep = (index: number) => {
    setSteps(
      steps
        .filter((_, i) => i !== index)
        .map((s, i) => ({ ...s, stepNumber: i + 1 }))
    );
  };

  const updateStep = (index: number, field: string, value: any) => {
    setSteps(steps.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const recipe: Recipe = {
      id: initialData?.id || generateId(),
      title: title.toUpperCase(),
      description,
      ingredients: ingredients.filter(i => i.name).map((i) => ({ ...i, id: generateId() })),
      steps: steps.filter(s => s.instruction).map((s) => ({ ...s, id: generateId() })),
      cookingTime,
      prepTime,
      servings,
      category,
      cuisine,
      diet,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      images: images.slice(1).map((data) => ({
        id: generateId(),
        data,
        caption: '',
        isStepImage: false,
      })),
      coverImage: images[0] || '',
      isFavorite: initialData?.isFavorite || false,
      createdAt: initialData?.createdAt || Date.now(),
      updatedAt: Date.now(),
      difficulty,
      calories: calories || undefined,
      rating: initialData?.rating || 0,
      viewCount: initialData?.viewCount || 0,
    };

    onSubmit(recipe);
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 12,
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: 'var(--text-secondary)',
    marginBottom: 6,
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 12,
    color: 'var(--text-primary)',
    fontSize: 14,
    outline: 'none',
    appearance: 'none' as const,
    cursor: 'pointer',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Title */}
      <div>
        <label style={labelStyle}>Recipe Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Chicken Biryani"
          className="input-field"
          required
          style={{ fontWeight: 600, fontSize: 16, textTransform: 'uppercase' }}
        />
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your recipe..."
          className="input-field"
          rows={3}
          style={{ resize: 'vertical' }}
        />
      </div>

      {/* Category, Cuisine, Diet, Difficulty row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
        <div>
          <label style={labelStyle}>Category *</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as RecipeCategory)} style={selectStyle}>
            {(CATEGORIES as string[]).filter(c => c !== 'All').map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Cuisine</label>
          <select value={cuisine} onChange={(e) => setCuisine(e.target.value as CuisineType)} style={selectStyle}>
            {(CUISINES as string[]).filter(c => c !== 'All').map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Diet</label>
          <select value={diet} onChange={(e) => setDiet(e.target.value as DietType)} style={selectStyle}>
            {(DIETS as string[]).filter(c => c !== 'All').map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Difficulty</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as any)} style={selectStyle}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Time, Servings, Calories */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 16 }}>
        <div>
          <label style={labelStyle}>Cook Time (min)</label>
          <input type="number" value={cookingTime} onChange={(e) => setCookingTime(+e.target.value)} className="input-field" min={1} />
        </div>
        <div>
          <label style={labelStyle}>Prep Time (min)</label>
          <input type="number" value={prepTime} onChange={(e) => setPrepTime(+e.target.value)} className="input-field" min={0} />
        </div>
        <div>
          <label style={labelStyle}>Servings</label>
          <input type="number" value={servings} onChange={(e) => setServings(+e.target.value)} className="input-field" min={1} />
        </div>
        <div>
          <label style={labelStyle}>Calories</label>
          <input type="number" value={calories} onChange={(e) => setCalories(+e.target.value)} className="input-field" min={0} placeholder="optional" />
        </div>
      </div>

      {/* Tags */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>Tags (comma separated)</label>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={async () => {
              const ingredientNames = ingredients.filter(i => i.name).map(i => i.name);
              if (ingredientNames.length === 0) return;
              const aiTags = await autoTagRecipe(title, ingredientNames, category, diet, cookingTime);
              if (aiTags.length > 0) {
                const existing = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];
                const merged = [...new Set([...existing, ...aiTags])];
                setTags(merged.join(', '));
              }
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '5px 10px',
              borderRadius: 8,
              background: 'rgba(225,6,0,0.1)',
              color: '#e10600',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Sparkles size={10} /> AI Tags
          </motion.button>
        </div>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="spicy, quick, healthy..."
          className="input-field"
        />
      </div>

      {/* Ingredients */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>Ingredients</label>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addIngredient}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '6px 12px',
              borderRadius: 10,
              background: 'rgba(225,6,0,0.1)',
              color: '#e10600',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Plus size={12} /> Add
          </motion.button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ingredients.map((ing, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ display: 'flex', gap: 8, alignItems: 'center' }}
            >
              <input
                value={ing.name}
                onChange={(e) => updateIngredient(i, 'name', e.target.value)}
                placeholder="Ingredient"
                className="input-field"
                style={{ flex: 2 }}
              />
              <input
                value={ing.quantity}
                onChange={(e) => updateIngredient(i, 'quantity', e.target.value)}
                placeholder="Qty"
                className="input-field"
                style={{ flex: 1 }}
              />
              <input
                value={ing.unit}
                onChange={(e) => updateIngredient(i, 'unit', e.target.value)}
                placeholder="Unit"
                className="input-field"
                style={{ flex: 1 }}
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(i)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'rgba(225,6,0,0.1)',
                    color: '#e10600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <Trash2 size={14} />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>Cooking Steps</label>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addStep}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '6px 12px',
              borderRadius: 10,
              background: 'rgba(225,6,0,0.1)',
              color: '#e10600',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Plus size={12} /> Add Step
          </motion.button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                display: 'flex',
                gap: 12,
                padding: 16,
                borderRadius: 12,
                background: 'rgba(255,199,198,0.03)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'var(--color-impossible-red)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <textarea
                  value={step.instruction}
                  onChange={(e) => updateStep(i, 'instruction', e.target.value)}
                  placeholder={`Step ${i + 1} instructions...`}
                  className="input-field"
                  rows={2}
                  style={{ resize: 'vertical' }}
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="number"
                    value={step.duration || ''}
                    onChange={(e) => updateStep(i, 'duration', +e.target.value || undefined)}
                    placeholder="Minutes"
                    className="input-field"
                    style={{ flex: 1 }}
                  />
                  <input
                    value={step.tip || ''}
                    onChange={(e) => updateStep(i, 'tip', e.target.value)}
                    placeholder="Pro tip (optional)"
                    className="input-field"
                    style={{ flex: 2 }}
                  />
                </div>
              </div>
              {steps.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStep(i)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: 'rgba(225,6,0,0.1)',
                    color: '#e10600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                    alignSelf: 'flex-start',
                  }}
                >
                  <Trash2 size={12} />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Upload */}
      <ImageUploader
        images={images}
        onImagesChange={setImages}
        maxImages={10}
        label="Recipe Photos"
      />

      {/* Submit */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 16 }}>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-ghost" style={{ padding: '12px 24px' }}>
            Cancel
          </button>
        )}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn-primary"
          style={{ padding: '12px 32px', fontSize: 14 }}
        >
          {isEdit ? 'UPDATE RECIPE' : 'SAVE RECIPE'}
        </motion.button>
      </div>
    </form>
  );
}
