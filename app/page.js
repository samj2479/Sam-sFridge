import FridgeApp from '@/components/FridgeApp';
import { dictionaries } from '@/lib/dictionaries';

export default function KoreanHome() {
  return <FridgeApp dict={dictionaries.ko} />;
}
