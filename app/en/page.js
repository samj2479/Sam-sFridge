import FridgeApp from '@/components/FridgeApp';
import { dictionaries } from '@/lib/dictionaries';

export default function EnglishHome() {
  return <FridgeApp dict={dictionaries.en} />;
}
