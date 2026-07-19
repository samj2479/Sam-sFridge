import { normalize } from '@/lib/utils';

function missingIngredients(recipe, fridgeSet) {
  return recipe.ingredients.filter(ing => !fridgeSet.has(normalize(ing.name)));
}

export default function SuggestionsSection({ dict, fridge, recipes }) {
  const fridgeSet = new Set(fridge.map(item => normalize(item.name)));
  const canMake = [];
  const almost = [];

  recipes.forEach(recipe => {
    const missing = missingIngredients(recipe, fridgeSet);
    if (missing.length === 0) canMake.push({ recipe, missing });
    else if (missing.length <= 2) almost.push({ recipe, missing });
  });

  return (
    <section>
      <h2 className="text-lg font-semibold mt-6 mb-3">{dict.suggestions.canMakeHeading}</h2>
      {canMake.length === 0 ? (
        <p className="text-gray-500 italic text-sm">{dict.suggestions.canMakeEmpty}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {canMake.map(({ recipe }) => (
            <RecipeCard key={recipe.id} dict={dict} recipe={recipe} missing={[]} tone="can-make" />
          ))}
        </div>
      )}

      <h2 className="text-lg font-semibold mt-6 mb-3">{dict.suggestions.almostHeading}</h2>
      {almost.length === 0 ? (
        <p className="text-gray-500 italic text-sm">{dict.suggestions.almostEmpty}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {almost.map(({ recipe, missing }) => (
            <RecipeCard key={recipe.id} dict={dict} recipe={recipe} missing={missing} tone="almost" />
          ))}
        </div>
      )}
    </section>
  );
}

function RecipeCard({ dict, recipe, missing, tone }) {
  const missingNames = new Set(missing.map(m => normalize(m.name)));
  const toneClasses =
    tone === 'can-make'
      ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800'
      : 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800';

  return (
    <div className={`border rounded-xl p-4 ${toneClasses}`}>
      <h3 className="font-semibold mb-1">
        <span className="text-gray-500 font-normal text-sm mr-1">#{recipe.num}</span>
        {recipe.name}
      </h3>
      <ul className="list-disc pl-5 text-sm">
        {recipe.ingredients.map((ing, i) => {
          const isMissing = missingNames.has(normalize(ing.name));
          return (
            <li key={i} className={isMissing ? 'text-red-600 dark:text-red-400' : ''}>
              {ing.name}
              {ing.qty && ` (${ing.qty})`}
              {isMissing && ` — ${dict.suggestions.missing}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
