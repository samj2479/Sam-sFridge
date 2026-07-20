import PageShell from '@/components/PageShell';
import { dictionaries } from '@/lib/dictionaries';

export default function KoreanRecipesPage() {
  return <PageShell dict={dictionaries.ko} page="recipes" />;
}
