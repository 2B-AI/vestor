# Vestor

**Community-Voted Meme Coin Launchpad on Solana**

Vestor operates like "American Idol for meme coins" — the community submits, votes on, and funds meme coin launches on Solana. Each 1-hour voting round determines which meme gets funded, with automatic token creation and Meteora liquidity pool seeding.

## Data Flow & Architecture

### System Overview

```mermaid
graph TB
    subgraph "User Interface"
        UI[Web App Frontend]
        WC[Wallet Connection]
    end

    subgraph "Solana Blockchain"
        SC[Smart Contracts]
        SOL[SOL Payments]
        TOK[Token Creation]
        MET[Meteora DEX]
    end

    subgraph "Platform Backend"
        API[API Layer]
        DB[(Database)]
        QUEUE[Submission Queue]
    end

    UI --> WC
    WC --> SC
    UI --> API
    API --> DB
    API --> QUEUE
    SC --> SOL
    SC --> TOK
    TOK --> MET
```

### Core User Flows

#### 1. Meme Submission Flow

```mermaid
sequenceDiagram
    participant U as User
    participant W as Wallet
    participant UI as Web App
    participant API as Backend
    participant Q as Queue

    U->>UI: Click "Submit Meme"
    UI->>W: Request wallet connection
    W->>UI: Wallet connected
    U->>UI: Fill form (name, ticker, description, image, supply)
    UI->>API: Submit meme data
    API->>API: Validate submission
    API->>Q: Add to voting queue
    API->>UI: Confirmation + estimated slot time
    UI->>U: "Your meme is in the queue!"
```

#### 2. Voting Process Flow

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Web App
    participant W as Wallet
    participant SC as Smart Contract
    participant SOL as Solana Network

    UI->>U: Display 3 memes + countdown timer
    U->>UI: Click "Vote" on preferred meme
    UI->>W: Request 0.05 SOL transaction
    W->>U: Approve transaction
    W->>SC: Send 0.05 SOL + vote data
    SC->>SOL: Record vote on-chain
    SC->>UI: Vote confirmation
    UI->>U: Update vote count (real-time)

    Note over SC,SOL: 1 wallet = 1 vote per meme enforced
    Note over UI: Round ends after 1 hour
```

#### 3. Fundraising Flow

```mermaid
sequenceDiagram
    participant U as Contributor
    participant UI as Web App
    participant W as Wallet
    participant ESC as Escrow Contract
    participant SC as Smart Contract

    UI->>U: Show winning meme + progress bar
    U->>UI: Enter SOL contribution amount
    UI->>W: Request SOL transaction
    W->>ESC: Send SOL to escrow
    ESC->>UI: Update progress bar

    alt Cap Reached (85 SOL)
        ESC->>SC: Trigger automatic launch
    else 48h Timeout
        ESC->>W: Auto-refund all contributors
    end
```

#### 4. Automatic Token Launch Flow

```mermaid
sequenceDiagram
    participant ESC as Escrow Contract
    participant SC as Smart Contract
    participant TOK as Token Factory
    participant MET as Meteora DEX
    participant CONT as Contributors
    participant PLAT as Platform
    participant SUB as Submitter

    ESC->>SC: 85 SOL cap reached
    SC->>TOK: Create token with defined supply
    SC->>MET: Deposit 70 SOL + 19.5% tokens
    SC->>CONT: Distribute 80% tokens proportionally
    SC->>PLAT: Send 0.5% tokens + 10 SOL fee
    SC->>SUB: Send 5 SOL reward
    SC->>UI: Launch confirmation + Solscan link
```

### Economic Distribution

#### SOL Raise Distribution (85 SOL Cap)

```mermaid
pie title SOL Distribution
    "Meteora Liquidity Pool" : 70
    "Platform Fee" : 10
    "Submitter Reward" : 5
```

#### Token Supply Distribution

```mermaid
pie title Token Distribution
    "Contributors (Proportional)" : 80
    "Liquidity Pool" : 19.5
    "Platform" : 0.5
```

### Platform States & Transitions

```mermaid
stateDiagram-v2
    [*] --> Submission
    Submission --> Queue
    Queue --> Voting
    Voting --> Winner
    Voting --> Loser
    Winner --> Fundraising
    Loser --> Queue
    Fundraising --> Launched
    Fundraising --> Failed
    Launched --> [*]
    Failed --> [*]

    note right of Voting
        1 hour duration
        3 memes compete
        0.05 SOL per vote
    end note

    note right of Fundraising
        48 hour window
        85 SOL target
        Auto-refund if failed
    end note
```

### Key Parameters

| Parameter            | Value             | Description              |
| -------------------- | ----------------- | ------------------------ |
| **Voting Duration**  | 1 hour            | Fixed round length       |
| **Voting Cost**      | 0.05 SOL          | Per vote, anti-spam      |
| **Voting Rule**      | 1 wallet = 1 vote | Anti-manipulation        |
| **Memes per Round**  | 3                 | Simultaneous competition |
| **Fundraise Cap**    | 85 SOL            | Target raise amount      |
| **Fundraise Window** | 48 hours          | Time limit for funding   |
| **Submission Fee**   | Free              | No cost to submit        |

### Security Features

- **On-chain voting**: All votes recorded on Solana blockchain
- **Smart contract automation**: No manual intervention in launches
- **Anti-manipulation**: 1 wallet = 1 vote rule enforced at contract level
- **Automatic refunds**: Failed raises refund contributors automatically
- **Transparent economics**: All distributions visible and automated

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
