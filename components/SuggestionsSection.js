import { normalize } from '@/lib/utils';
import OrnamentDivider from './OrnamentDivider';

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
      <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-6">{dict.suggestions.canMakeHeading}</h2>
      {canMake.length === 0 ? (
        <p className="text-neutral-400 italic text-sm">{dict.suggestions.canMakeEmpty}</p>
      ) : (
        <div className="flex flex-col gap-4">
          {canMake.map(({ recipe }) => (
            <RecipeCard key={recipe.id} dict={dict} recipe={recipe} missing={[]} tag={dict.suggestions.canMakeTag} tagAccent />
          ))}
        </div>
      )}

      <OrnamentDivider />

      <h2 className="font-serif text-2xl md:text-3xl tracking-tight mb-6">{dict.suggestions.almostHeading}</h2>
      {almost.length === 0 ? (
        <p className="text-neutral-400 italic text-sm">{dict.suggestions.almostEmpty}</p>
      ) : (
        <div className="flex flex-col gap-4">
          {almost.map(({ recipe, missing }) => (
            <RecipeCard key={recipe.id} dict={dict} recipe={recipe} missing={missing} tag={dict.suggestions.almostTag} />
          ))}
        </div>
      )}
    </section>
  );
}

function RecipeCard({ dict, recipe, missing, tag, tagAccent }) {
  const missingNames = new Set(missing.map(m => normalize(m.name)));

  return (
    <div className="border border-neutral-200 bg-white p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-serif text-xl">
          <span className="text-neutral-400 font-sans font-normal text-sm mr-2">#{recipe.num}</span>
          {recipe.name}
        </h3>
        <span
          className={`uppercase text-[0.65rem] tracking-widest font-bold px-3 py-1 rounded-full border ${
            tagAccent ? 'text-accent border-accent' : 'text-neutral-400 border-neutral-300'
          }`}
        >
          {tag}
        </span>
      </div>
      <ul className="list-disc pl-5 text-sm text-neutral-600">
        {recipe.ingredients.map((ing, i) => {
          const isMissing = missingNames.has(normalize(ing.name));
          return (
            <li key={i} className={isMissing ? 'text-neutral-400 italic' : ''}>
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
