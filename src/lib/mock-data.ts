export interface Meme {
  id: string;
  name: string;
  ticker: string;
  description: string;
  imageUrl: string;
  tokenSupply: number;
  submitter: string;
  submittedAt: Date;
}

export interface VotingRound {
  id: string;
  meme: Meme;
  startTime: Date;
  endTime: Date;
  voteCount: number;
  status: "active" | "ended";
  hasVoted?: boolean;
}

export interface Fundraise {
  id: string;
  meme: Meme;
  solRaised: number;
  solCap: number;
  startTime: Date;
  endTime: Date;
  status: "active" | "funded" | "launched" | "failed";
  contributors: number;
}

export interface PastLaunch {
  id: string;
  meme: Meme;
  status: "launched" | "funded" | "failed";
  solRaised: number;
  solCap: number;
  voteCount: number;
  tokenAddress?: string;
  meteoraPoolUrl?: string;
  solscanUrl?: string;
  launchedAt?: Date;
}

export interface Contribution {
  id: string;
  meme: Meme;
  solAmount: number;
  timestamp: Date;
  status: "pending" | "refunded" | "distributed";
  tokensReceived?: number;
  tokenAddress?: string;
}

export const MOCK_MEMES: Meme[] = [
  {
    id: "1",
    name: "PEPEWIFHAT",
    ticker: "$PWH",
    description: "Pepe finally got his hat. The most fashionable frog on Solana. No cap, just hat. 🐸🎩",
    imageUrl: "https://placehold.co/400x400/1a1a2e/14f195?text=🐸🎩&font=roboto",
    tokenSupply: 1_000_000_000,
    submitter: "7xKX...9fGh",
    submittedAt: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    name: "SOLCAT",
    ticker: "$SCAT",
    description: "The internet's favorite cat, now on Solana. Fast, furry, and feeless. Meow to the moon! 🐱",
    imageUrl: "https://placehold.co/400x400/1a1a2e/a855f7?text=🐱⚡&font=roboto",
    tokenSupply: 500_000_000,
    submitter: "3mPQ...kL2x",
    submittedAt: new Date(Date.now() - 7200000),
  },
  {
    id: "3",
    name: "BONKFATHER",
    ticker: "$BFATHER",
    description: "The Godfather of all bonks. An offer your portfolio can't refuse. 🔨🎬",
    imageUrl: "https://placehold.co/400x400/1a1a2e/f59e0b?text=🔨🎬&font=roboto",
    tokenSupply: 2_000_000_000,
    submitter: "9aBC...dE4f",
    submittedAt: new Date(Date.now() - 10800000),
  },
  {
    id: "4",
    name: "GIGACHAD",
    ticker: "$GIGA",
    description: "Average meme coin fan vs average GIGACHAD enjoyer. Built different, launched different. 💪",
    imageUrl: "https://placehold.co/400x400/1a1a2e/00d4ff?text=💪😎&font=roboto",
    tokenSupply: 420_690_000,
    submitter: "5gHi...jK7m",
    submittedAt: new Date(Date.now() - 14400000),
  },
  {
    id: "5",
    name: "DOGEWIFKNIFE",
    ticker: "$DWK",
    description: "He's a good boy. With a knife. Don't ask questions. Just ape. 🐕🔪",
    imageUrl: "https://placehold.co/400x400/1a1a2e/ef4444?text=🐕🔪&font=roboto",
    tokenSupply: 777_777_777,
    submitter: "2nOP...qR8s",
    submittedAt: new Date(Date.now() - 18000000),
  },
];

const now = new Date();
const oneHourFromNow = new Date(now.getTime() + 3600000);
const fortyEightHoursFromNow = new Date(now.getTime() + 48 * 3600000);

export const MOCK_ACTIVE_VOTE: VotingRound = {
  id: "round-42",
  meme: MOCK_MEMES[0],
  startTime: now,
  endTime: oneHourFromNow,
  voteCount: 247,
  status: "active",
  hasVoted: false,
};

export const MOCK_ACTIVE_FUNDRAISE: Fundraise = {
  id: "fund-41",
  meme: MOCK_MEMES[1],
  solRaised: 52.4,
  solCap: 85,
  startTime: new Date(now.getTime() - 12 * 3600000),
  endTime: new Date(now.getTime() + 36 * 3600000),
  status: "active",
  contributors: 89,
};

export const MOCK_PAST_LAUNCHES: PastLaunch[] = [
  {
    id: "launch-1",
    meme: MOCK_MEMES[2],
    status: "launched",
    solRaised: 85,
    solCap: 85,
    voteCount: 412,
    tokenAddress: "BFath...er69",
    meteoraPoolUrl: "https://app.meteora.ag",
    solscanUrl: "https://solscan.io",
    launchedAt: new Date(now.getTime() - 2 * 86400000),
  },
  {
    id: "launch-2",
    meme: MOCK_MEMES[3],
    status: "funded",
    solRaised: 85,
    solCap: 85,
    voteCount: 356,
    launchedAt: new Date(now.getTime() - 4 * 86400000),
  },
  {
    id: "launch-3",
    meme: MOCK_MEMES[4],
    status: "failed",
    solRaised: 31.2,
    solCap: 85,
    voteCount: 189,
    launchedAt: new Date(now.getTime() - 6 * 86400000),
  },
];

export const MOCK_CONTRIBUTIONS: Contribution[] = [
  {
    id: "contrib-1",
    meme: MOCK_MEMES[1],
    solAmount: 2.5,
    timestamp: new Date(now.getTime() - 6 * 3600000),
    status: "pending",
  },
  {
    id: "contrib-2",
    meme: MOCK_MEMES[2],
    solAmount: 5.0,
    timestamp: new Date(now.getTime() - 3 * 86400000),
    status: "distributed",
    tokensReceived: 117_647_058,
    tokenAddress: "BFath...er69",
  },
  {
    id: "contrib-3",
    meme: MOCK_MEMES[4],
    solAmount: 1.0,
    timestamp: new Date(now.getTime() - 7 * 86400000),
    status: "refunded",
  },
];

export const MOCK_QUEUE_MEMES: Meme[] = [
  MOCK_MEMES[3],
  MOCK_MEMES[4],
  {
    id: "6",
    name: "LLAMAVERSE",
    ticker: "$LLAMA",
    description: "Llamas in the metaverse. Spitting facts and tokens. 🦙🌌",
    imageUrl: "https://placehold.co/400x400/1a1a2e/a855f7?text=🦙🌌&font=roboto",
    tokenSupply: 1_500_000_000,
    submitter: "4tUV...wX1y",
    submittedAt: new Date(now.getTime() - 1800000),
  },
];
