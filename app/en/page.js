import PageShell from '@/components/PageShell';
import { dictionaries } from '@/lib/dictionaries';

export default function EnglishFridgePage() {
  return <PageShell dict={dictionaries.en} page="fridge" />;
}
