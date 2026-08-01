// lib/mock-data.ts
// Mock data for Azura.finance — frontend UI only (no API calls)

export type TokenType = 'normal' | 'tax' | 'open';
export type TokenTag = 'trending' | 'new' | 'graduating' | 'graduated' | 'kol';

export interface Token {
  id: string;
  name: string;
  symbol: string;
  /** CSS gradient string for avatar background */
  avatarGradient: string;
  creator: string;
  createdAt: string;
  /** Market cap in USD */
  mcap: number;
  price: number;
  priceChange5m: number;
  priceChange1h: number;
  priceChange4h: number;
  priceChange24h: number;
  /** 24h volume in USD */
  volume24h: number;
  holders: number;
  replies: number;
  /** 0–100 */
  bondingProgress: number;
  tags: TokenTag[];
  description: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  contractAddress: string;
  type: TokenType;
  graduated: boolean;
}

export interface Trade {
  id: string;
  type: 'buy' | 'sell';
  trader: string;
  tokenAmount: number;
  bnbAmount: number;
  time: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  time: string;
  likes: number;
}

export interface Holder {
  rank: number;
  address: string;
  percentage: number;
  amount: number;
  isCreator: boolean;
  isBonding: boolean;
}

export interface TickerItem {
  symbol: string;
  change: string;
  positive: boolean;
}

// ================================================================
// Mock Tokens
// ================================================================
export const MOCK_TOKENS: Token[] = [
  {
    id: '1',
    name: 'AzuraSwap',
    symbol: 'AZURA',
    avatarGradient: 'linear-gradient(135deg, #22E0C8 0%, #3E7BF0 100%)',
    creator: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
    createdAt: '2m ago',
    mcap: 284500,
    price: 0.00000284,
    priceChange5m: 12.4,
    priceChange1h: 34.2,
    priceChange4h: 78.6,
    priceChange24h: 145.8,
    volume24h: 45200,
    holders: 1247,
    replies: 89,
    bondingProgress: 76,
    tags: ['trending', 'kol'],
    description: 'The next generation DEX aggregator built for speed and efficiency on BNB Chain. Powered by Azura protocol.',
    website: 'https://azura.finance',
    twitter: 'https://twitter.com/azurafinance',
    telegram: 'https://t.me/azurafinance',
    contractAddress: '0xDEADBEEF1234567890abcdef1234567890abcdef',
    type: 'normal',
    graduated: false,
  },
  {
    id: '2',
    name: 'NeonPepe',
    symbol: 'NPEPE',
    avatarGradient: 'linear-gradient(135deg, #22E0C8 0%, #2FC8E8 100%)',
    creator: '0x9f8e7d6c5b4a39281706f5e4d3c2b1a0f9e8d7c6',
    createdAt: '8m ago',
    mcap: 182300,
    price: 0.00000182,
    priceChange5m: -3.2,
    priceChange1h: 8.7,
    priceChange4h: -12.4,
    priceChange24h: 22.1,
    volume24h: 28900,
    holders: 893,
    replies: 43,
    bondingProgress: 42,
    tags: ['new'],
    description: 'The neon remix of the original internet frog — this time on BNB Chain with ultra-fast tokenomics.',
    contractAddress: '0xABCDEF1234567890abcdef1234567890abcdef12',
    type: 'normal',
    graduated: false,
  },
  {
    id: '3',
    name: 'QuantumDog',
    symbol: 'QDOG',
    avatarGradient: 'linear-gradient(135deg, #7B5BE0 0%, #3E7BF0 100%)',
    creator: '0x2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d',
    createdAt: '15m ago',
    mcap: 567800,
    price: 0.00000568,
    priceChange5m: 5.1,
    priceChange1h: 18.9,
    priceChange4h: 45.3,
    priceChange24h: 310.4,
    volume24h: 123400,
    holders: 3421,
    replies: 234,
    bondingProgress: 92,
    tags: ['trending', 'graduating'],
    description: 'The quantum-entangled canine that defies market gravity with physics-backed tokenomics.',
    contractAddress: '0x1234567890ABCDEF1234567890abcdef12345678',
    type: 'normal',
    graduated: false,
  },
  {
    id: '4',
    name: 'CyberShib',
    symbol: 'CSHIB',
    avatarGradient: 'linear-gradient(135deg, #2FC8E8 0%, #7B5BE0 100%)',
    creator: '0x3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f',
    createdAt: '1h ago',
    mcap: 98700,
    price: 0.0000000987,
    priceChange5m: -8.4,
    priceChange1h: -22.1,
    priceChange4h: -35.6,
    priceChange24h: -48.3,
    volume24h: 15600,
    holders: 421,
    replies: 18,
    bondingProgress: 23,
    tags: ['new'],
    description: 'Cyberpunk-themed Shiba INU fork with AI-powered tokenomics and community governance.',
    contractAddress: '0xFEDCBA9876543210fedcba9876543210fedcba98',
    type: 'tax',
    graduated: false,
  },
  {
    id: '5',
    name: 'TurboMoon',
    symbol: 'TMOON',
    avatarGradient: 'linear-gradient(135deg, #22E0C8 0%, #7B5BE0 100%)',
    creator: '0x4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a',
    createdAt: '2h ago',
    mcap: 1240000,
    price: 0.00000124,
    priceChange5m: 2.3,
    priceChange1h: 7.8,
    priceChange4h: 28.4,
    priceChange24h: 198.6,
    volume24h: 456700,
    holders: 8934,
    replies: 567,
    bondingProgress: 100,
    tags: ['graduated'],
    description: 'First-ever deflationary moon token with built-in buy pressure mechanics. Now live on PancakeSwap.',
    contractAddress: '0x0123456789ABCDEF0123456789abcdef01234567',
    type: 'normal',
    graduated: true,
  },
  {
    id: '6',
    name: 'SonicBat',
    symbol: 'SBAT',
    avatarGradient: 'linear-gradient(135deg, #3E7BF0 0%, #22E0C8 100%)',
    creator: '0x5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
    createdAt: '3h ago',
    mcap: 341200,
    price: 0.000000341,
    priceChange5m: 0.8,
    priceChange1h: 4.2,
    priceChange4h: 11.7,
    priceChange24h: 67.3,
    volume24h: 89200,
    holders: 2134,
    replies: 128,
    bondingProgress: 58,
    tags: ['trending'],
    description: 'Ultra-fast memecoin inspired by sonic creatures of the night — speed and stealth in every trade.',
    contractAddress: '0x9876543210FEDCBA9876543210fedcba98765432',
    type: 'normal',
    graduated: false,
  },
  {
    id: '7',
    name: 'GalacticApe',
    symbol: 'GAPE',
    avatarGradient: 'linear-gradient(135deg, #7B5BE0 0%, #2FC8E8 100%)',
    creator: '0x6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c',
    createdAt: '5h ago',
    mcap: 789000,
    price: 0.000000789,
    priceChange5m: -1.2,
    priceChange1h: 15.6,
    priceChange4h: 42.8,
    priceChange24h: 234.5,
    volume24h: 234500,
    holders: 5678,
    replies: 345,
    bondingProgress: 85,
    tags: ['trending', 'kol'],
    description: 'Space-traveling ape civilization with intergalactic tokenomics — the stars are just the beginning.',
    contractAddress: '0xABCD1234EFAB5678ABCD1234EFAB5678ABCD1234',
    type: 'open',
    graduated: false,
  },
  {
    id: '8',
    name: 'PlasmaWolf',
    symbol: 'PWOLF',
    avatarGradient: 'linear-gradient(135deg, #FF5C4D 0%, #7B5BE0 100%)',
    creator: '0x7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
    createdAt: '8h ago',
    mcap: 52400,
    price: 0.0000000524,
    priceChange5m: -15.3,
    priceChange1h: -28.9,
    priceChange4h: -41.2,
    priceChange24h: -62.4,
    volume24h: 8900,
    holders: 234,
    replies: 12,
    bondingProgress: 12,
    tags: [],
    description: 'The apex predator of the BNB memecoin ecosystem — feeding on weak hands.',
    contractAddress: '0x1234ABCD5678ABCD1234ABCD5678ABCD12345678',
    type: 'normal',
    graduated: false,
  },
  {
    id: '9',
    name: 'NebulaCat',
    symbol: 'NCAT',
    avatarGradient: 'linear-gradient(135deg, #2FC8E8 0%, #22E0C8 100%)',
    creator: '0x8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e',
    createdAt: '12h ago',
    mcap: 428000,
    price: 0.000000428,
    priceChange5m: 3.7,
    priceChange1h: 11.2,
    priceChange4h: 29.8,
    priceChange24h: 87.6,
    volume24h: 134500,
    holders: 3245,
    replies: 198,
    bondingProgress: 64,
    tags: ['trending'],
    description: 'Cats from the nebula, bringing astronomical gains to the BNB Chain community.',
    contractAddress: '0xEFAB1234ABCD5678EFAB1234ABCD5678EFAB1234',
    type: 'normal',
    graduated: false,
  },
  {
    id: '10',
    name: 'ZeroGravity',
    symbol: 'ZERO',
    avatarGradient: 'linear-gradient(135deg, #3E7BF0 0%, #7B5BE0 100%)',
    creator: '0x9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f',
    createdAt: '1d ago',
    mcap: 2340000,
    price: 0.00000234,
    priceChange5m: 0.4,
    priceChange1h: 2.1,
    priceChange4h: 8.9,
    priceChange24h: 45.2,
    volume24h: 789000,
    holders: 12456,
    replies: 892,
    bondingProgress: 100,
    tags: ['graduated'],
    description: 'First BNB Chain token to achieve zero-gravity tokenomics with perpetual deflation and buy pressure.',
    contractAddress: '0x5678ABCD4321EFAB5678ABCD4321EFAB56785678',
    type: 'normal',
    graduated: true,
  },
  {
    id: '11',
    name: 'CryptoHedgehog',
    symbol: 'HEDGE',
    avatarGradient: 'linear-gradient(135deg, #22E0C8 0%, #2FC8E8 100%)',
    creator: '0x0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f90',
    createdAt: '2d ago',
    mcap: 178900,
    price: 0.000000178,
    priceChange5m: -0.6,
    priceChange1h: 3.4,
    priceChange4h: -5.2,
    priceChange24h: 12.8,
    volume24h: 45600,
    holders: 1893,
    replies: 89,
    bondingProgress: 38,
    tags: [],
    description: 'Spiky deflationary hedgehog token with self-reinforcing buy pressure and community-driven governance.',
    contractAddress: '0xABCD5678ABCD1234ABCD5678ABCD1234ABCD5678',
    type: 'tax',
    graduated: false,
  },
  {
    id: '12',
    name: 'PhotonRabit',
    symbol: 'PHOTON',
    avatarGradient: 'linear-gradient(135deg, #3E7BF0 0%, #22E0C8 100%)',
    creator: '0x1a2b3c4d5e6f7890abcdef0987654321fedcba98',
    createdAt: '3d ago',
    mcap: 892000,
    price: 0.000000892,
    priceChange5m: 6.2,
    priceChange1h: 23.4,
    priceChange4h: 67.8,
    priceChange24h: 189.3,
    volume24h: 345600,
    holders: 6789,
    replies: 412,
    bondingProgress: 98,
    tags: ['trending', 'graduating'],
    description: 'Light-speed bunny hopping its way through the BNB Chain ecosystem — graduation imminent.',
    contractAddress: '0x8765ABCD4321ABCD8765ABCD4321ABCD87658765',
    type: 'open',
    graduated: false,
  },
];

// ================================================================
// Mock Trades
// ================================================================
export const MOCK_TRADES: Trade[] = [
  { id: '1', type: 'buy',  trader: '0x1234...abcd', tokenAmount: 1240000, bnbAmount: 0.45, time: '12s ago' },
  { id: '2', type: 'sell', trader: '0x9876...fedc', tokenAmount: 890000,  bnbAmount: 0.32, time: '45s ago' },
  { id: '3', type: 'buy',  trader: '0xaaaa...bbbb', tokenAmount: 3456000, bnbAmount: 1.24, time: '1m ago' },
  { id: '4', type: 'buy',  trader: '0xcccc...dddd', tokenAmount: 780000,  bnbAmount: 0.28, time: '2m ago' },
  { id: '5', type: 'sell', trader: '0xeeee...ffff', tokenAmount: 2100000, bnbAmount: 0.76, time: '3m ago' },
  { id: '6', type: 'buy',  trader: '0x1111...2222', tokenAmount: 5670000, bnbAmount: 2.04, time: '5m ago' },
  { id: '7', type: 'sell', trader: '0x3333...4444', tokenAmount: 1230000, bnbAmount: 0.44, time: '7m ago' },
  { id: '8', type: 'buy',  trader: '0x5555...6666', tokenAmount: 890000,  bnbAmount: 0.32, time: '9m ago' },
  { id: '9', type: 'buy',  trader: '0x7777...8888', tokenAmount: 4560000, bnbAmount: 1.64, time: '11m ago' },
  { id: '10',type: 'sell', trader: '0x9999...0000', tokenAmount: 670000,  bnbAmount: 0.24, time: '14m ago' },
];

// ================================================================
// Mock Comments
// ================================================================
export const MOCK_COMMENTS: Comment[] = [
  { id: '1', author: '0x1234...abcd', content: 'This is the next 100x gem! The team is solid and the tokenomics are bulletproof. WAGMI 🚀', time: '5m ago', likes: 47 },
  { id: '2', author: '0x9876...fedc', content: 'Dev is based. Already 3x from launch and still going. Bonding curve at 76% and climbing fast!', time: '12m ago', likes: 23 },
  { id: '3', author: '0xaaaa...bbbb', content: 'KOL just posted about this. We are so back 🔥🔥🔥', time: '18m ago', likes: 89 },
  { id: '4', author: '0xcccc...dddd', content: 'Great chart structure. Classic accumulation pattern before the next leg up. Loading up.', time: '25m ago', likes: 14 },
  { id: '5', author: '0xeeee...ffff', content: 'Just aped in 2 BNB. This is going to PancakeSwap. Bond curve looking juicy 👀', time: '32m ago', likes: 31 },
  { id: '6', author: '0x7777...8888', content: 'Liquidity is locked and contract is renounced. This is as safe as it gets for a launch.', time: '45m ago', likes: 56 },
];

// ================================================================
// Mock Top Holders
// ================================================================
export const TOP_HOLDERS: Holder[] = [
  { rank: 1,  address: 'Bonding Curve',  percentage: 72.4, amount: 724000000, isCreator: false, isBonding: true  },
  { rank: 2,  address: '0x1234...abcd',  percentage: 8.4,  amount: 84000000,  isCreator: false, isBonding: false },
  { rank: 3,  address: '0x9876...fedc',  percentage: 5.2,  amount: 52000000,  isCreator: false, isBonding: false },
  { rank: 4,  address: 'Dev (Creator)',   percentage: 4.8,  amount: 48000000,  isCreator: true,  isBonding: false },
  { rank: 5,  address: '0xaaaa...bbbb',  percentage: 3.9,  amount: 39000000,  isCreator: false, isBonding: false },
  { rank: 6,  address: '0xbbbb...cccc',  percentage: 3.1,  amount: 31000000,  isCreator: false, isBonding: false },
  { rank: 7,  address: '0xcccc...dddd',  percentage: 1.2,  amount: 12000000,  isCreator: false, isBonding: false },
  { rank: 8,  address: '0xdddd...eeee',  percentage: 0.5,  amount: 5000000,   isCreator: false, isBonding: false },
  { rank: 9,  address: '0xeeee...ffff',  percentage: 0.3,  amount: 3000000,   isCreator: false, isBonding: false },
  { rank: 10, address: '0xffff...0000',  percentage: 0.2,  amount: 2000000,   isCreator: false, isBonding: false },
];

// ================================================================
// Trending Ticker Items
// ================================================================
export const TRENDING_TICKERS: TickerItem[] = [
  { symbol: 'AZURA',  change: '+12.4%', positive: true  },
  { symbol: 'NPEPE',  change: '+8.7%',  positive: true  },
  { symbol: 'QDOG',   change: '+18.9%', positive: true  },
  { symbol: 'CSHIB',  change: '-22.1%', positive: false },
  { symbol: 'TMOON',  change: '+7.8%',  positive: true  },
  { symbol: 'SBAT',   change: '+4.2%',  positive: true  },
  { symbol: 'GAPE',   change: '+15.6%', positive: true  },
  { symbol: 'PWOLF',  change: '-28.9%', positive: false },
  { symbol: 'NCAT',   change: '+11.2%', positive: true  },
  { symbol: 'ZERO',   change: '+2.1%',  positive: true  },
  { symbol: 'HEDGE',  change: '+3.4%',  positive: true  },
  { symbol: 'PHOTON', change: '+23.4%', positive: true  },
];

// ================================================================
// Utility Formatters
// ================================================================
export function formatMcap(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000)     return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

export function formatAddress(address: string): string {
  if (address.length < 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatChange(change: number): string {
  const sign = change > 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
}

export function formatVolume(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000)     return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

export function formatTokenAmount(amount: number): string {
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(2)}M`;
  if (amount >= 1_000)     return `${(amount / 1_000).toFixed(1)}K`;
  return amount.toFixed(0);
}

/** Locale-safe number with comma thousands separator (no toLocaleString) */
export function formatNumber(value: number): string {
  const s = Math.round(value).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
