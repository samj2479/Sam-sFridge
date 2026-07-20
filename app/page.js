import PageShell from '@/components/PageShell';
import { dictionaries } from '@/lib/dictionaries';

export default function KoreanFridgePage() {
  return <PageShell dict={dictionaries.ko} page="fridge" />;
}
