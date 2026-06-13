import { WavesHorizontal, TrendingUp, Smile, Users } from 'lucide-react';
import { IconCardGrid } from '@/components/web/blocks/IconCardGrid';

const USP_ITEMS = [
  { icon: WavesHorizontal, titleKey: 'home_usp_1_title', descKey: 'home_usp_1_desc' },
  { icon: TrendingUp,      titleKey: 'home_usp_2_title', descKey: 'home_usp_2_desc' },
  { icon: Smile,           titleKey: 'home_usp_3_title', descKey: 'home_usp_3_desc' },
  { icon: Users,           titleKey: 'home_usp_4_title', descKey: 'home_usp_4_desc' },
];

type Props = { v: (key: string, fallback?: string) => string };

export default function UspSection({ v }: Props) {
  const items = USP_ITEMS.map(({ icon, titleKey, descKey }) => ({
    icon,
    title: v(titleKey),
    desc: v(descKey),
  }));

  return (
    <IconCardGrid
      title={v('home_usp_main_title', 'Come catch some waves.')}
      items={items}
    />
  );
}
