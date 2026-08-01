import type { Metadata } from 'next';
import HeroBanner from '@/components/home/HeroBanner';
import HomeContent from '@/components/home/HomeContent';

export const metadata: Metadata = {
  title: 'Azura.finance — Browse Tokens',
  description: 'Discover and trade the hottest tokens launching on BNB Chain. Fair launches with bonding curve mechanics.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-full" style={{ background: '#050708' }}>
      <HeroBanner />
      <HomeContent />
    </div>
  );
}
