export interface Project {
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
  projects: Project[];
  startTime: Date;
  endTime: Date;
  voteCounts: { [projectId: string]: number };
  status: "active" | "ended";
  hasVoted?: { [projectId: string]: boolean };
}

export interface Fundraise {
  id: string;
  project: Project;
  solRaised: number;
  solCap: number;
  startTime: Date;
  endTime: Date;
  status: "active" | "funded" | "launched" | "failed";
  contributors: number;
}

export interface PastLaunch {
  id: string;
  project: Project;
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
  project: Project;
  solAmount: number;
  timestamp: Date;
  status: "pending" | "refunded" | "distributed";
  tokensReceived?: number;
  tokenAddress?: string;
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    name: "NeuroLang",
    ticker: "$NRL",
    description:
      "Decentralized LLM inference network on Solana. Run AI models permissionlessly with token-incentivized GPU providers.",
    imageUrl: "/memes/pepewifhat.svg",
    tokenSupply: 1_000_000_000,
    submitter: "7xKX...9fGh",
    submittedAt: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    name: "SolVision",
    ticker: "$SVIS",
    description:
      "On-chain computer vision API. Developers pay with tokens to access real-time image recognition models.",
    imageUrl: "/memes/solcat.svg",
    tokenSupply: 500_000_000,
    submitter: "3mPQ...kL2x",
    submittedAt: new Date(Date.now() - 7200000),
  },
  {
    id: "3",
    name: "AgentForge",
    ticker: "$AFRG",
    description:
      "Autonomous AI agent marketplace on Solana. Deploy, discover, and monetize AI agents with on-chain payments.",
    imageUrl: "/memes/bonkfather.svg",
    tokenSupply: 2_000_000_000,
    submitter: "9aBC...dE4f",
    submittedAt: new Date(Date.now() - 10800000),
  },
  {
    id: "4",
    name: "DataMesh",
    ticker: "$DMSH",
    description:
      "Decentralized AI training data marketplace. Contributors earn tokens for providing high-quality labeled datasets.",
    imageUrl: "/memes/gigachad.svg",
    tokenSupply: 420_690_000,
    submitter: "5gHi...jK7m",
    submittedAt: new Date(Date.now() - 14400000),
  },
  {
    id: "5",
    name: "ChainMind",
    ticker: "$CMND",
    description:
      "AI-powered smart contract auditor. Automated vulnerability detection and optimization suggestions for Solana programs.",
    imageUrl: "/memes/dogewifknife.svg",
    tokenSupply: 777_777_777,
    submitter: "2nOP...qR8s",
    submittedAt: new Date(Date.now() - 18000000),
  },
];

const now = new Date();
const oneHourFromNow = new Date(now.getTime() + 3600000);

export const MOCK_ACTIVE_VOTE: VotingRound = {
  id: "round-42",
  projects: [MOCK_PROJECTS[0], MOCK_PROJECTS[1], MOCK_PROJECTS[2]],
  startTime: now,
  endTime: oneHourFromNow,
  voteCounts: {
    "1": 247,
    "2": 189,
    "3": 156,
  },
  status: "active",
  hasVoted: {
    "1": false,
    "2": false,
    "3": false,
  },
};

export const MOCK_ACTIVE_FUNDRAISE: Fundraise = {
  id: "fund-41",
  project: MOCK_PROJECTS[1],
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
    project: MOCK_PROJECTS[2],
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
    project: MOCK_PROJECTS[3],
    status: "funded",
    solRaised: 85,
    solCap: 85,
    voteCount: 356,
    launchedAt: new Date(now.getTime() - 4 * 86400000),
  },
  {
    id: "launch-3",
    project: MOCK_PROJECTS[4],
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
    project: MOCK_PROJECTS[1],
    solAmount: 2.5,
    timestamp: new Date(now.getTime() - 6 * 3600000),
    status: "pending",
  },
  {
    id: "contrib-2",
    project: MOCK_PROJECTS[2],
    solAmount: 5.0,
    timestamp: new Date(now.getTime() - 3 * 86400000),
    status: "distributed",
    tokensReceived: 117_647_058,
    tokenAddress: "BFath...er69",
  },
  {
    id: "contrib-3",
    project: MOCK_PROJECTS[4],
    solAmount: 1.0,
    timestamp: new Date(now.getTime() - 7 * 86400000),
    status: "refunded",
  },
];

export const MOCK_QUEUE_PROJECTS: Project[] = [
  MOCK_PROJECTS[3],
  MOCK_PROJECTS[4],
  MOCK_PROJECTS[2],
];
