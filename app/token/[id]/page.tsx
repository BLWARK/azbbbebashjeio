import type { Metadata } from 'next';
import { MOCK_TOKENS } from '@/lib/mock-data';
import TokenHeader from '@/components/token-detail/TokenHeader';
import TradingChart from '@/components/token-detail/TradingChart';
import TradesCommentsTabs from '@/components/token-detail/TradesCommentsTabs';
import TradeWidget from '@/components/token-detail/TradeWidget';
import TopHolders from '@/components/token-detail/TopHolders';

// Static generation for all known token IDs
export function generateStaticParams() {
  return MOCK_TOKENS.map((token) => ({ id: token.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const token = MOCK_TOKENS.find((t) => t.id === id);
  if (!token) return { title: 'Token Not Found — Azura.finance' };
  return {
    title: `${token.name} (${token.symbol}) — Azura.finance`,
    description: token.description,
  };
}

export default async function TokenDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = MOCK_TOKENS.find((t) => t.id === id) ?? MOCK_TOKENS[0];

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#050708' }}>
      {/* Token header */}
      <TokenHeader token={token} />

      {/* Main content — two columns */}
      <div
        className="flex flex-col xl:flex-row gap-4 p-4 sm:p-6 flex-1"
        style={{ alignItems: 'flex-start' }}
      >
        {/* Left column — chart + trades */}
        <div className="flex flex-col flex-1 min-w-0 w-full" style={{ gap: 0 }}>
          <TradingChart />
          <TradesCommentsTabs />
        </div>

        {/* Right column — trade widget + top holders */}
        <div className="flex flex-col flex-shrink-0 w-full xl:w-[300px]" style={{ gap: 0 }}>
          <TradeWidget token={token} />
          <TopHolders />
        </div>
      </div>
    </div>
  );
}
