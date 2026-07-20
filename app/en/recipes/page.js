import PageShell from '@/components/PageShell';
import { dictionaries } from '@/lib/dictionaries';

export default function EnglishRecipesPage() {
  return <PageShell dict={dictionaries.en} page="recipes" />;
}
