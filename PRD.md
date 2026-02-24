# MemeVote
### Community-Voted Meme Coin Launchpad on Solana
**MVP Product Requirements Document (PRD)**
*Version 1.0 | February 2026 | Confidential*

---

## 1. Project Overview

MemeVote is a standalone web platform on Solana where the community submits, votes on, and funds meme coin launches. It operates like "American Idol for meme coins" — the crowd picks the winner, funds it, and receives the token supply at launch.

Each voting round lasts 1 hour. The meme that receives the most votes is promoted to a fundraising phase where users contribute SOL. Once the raise cap of 85 SOL is filled, the token is automatically created and deployed on Meteora with a liquidity pool seeded from the raise. Contributors receive their proportional token allocation automatically.

The platform is entirely on-chain. Voting and funding both require a connected Solana wallet. Browsing is open to all.

---

## 2. Goals & Non-Goals

### 2.1 MVP Goals
- Allow users to submit meme coin ideas for free
- Run 1-hour on-chain community voting rounds
- Allow winners to proceed to a SOL fundraising phase (capped at 85 SOL)
- Automatically deploy the token and seed a Meteora liquidity pool on cap fill
- Distribute tokens to contributors proportionally
- Refund contributors automatically if the raise cap is not reached in time

### 2.2 Non-Goals (Out of Scope for MVP)
- KYC / AML checks
- Mobile app
- Secondary trading or in-platform swap
- DAO governance or token-gated features
- KOL payment infrastructure (handled off-platform for MVP)

---

## 3. Key Decisions & Parameters

| Parameter | Value / Decision |
|---|---|
| Platform | Standalone (not connected to 2B Trader) |
| Blockchain | Solana |
| DEX for Launch | Meteora |
| Voting Duration | 1 hour per round |
| Voting Cost | 0.05 SOL per vote ⚠️ *assumption* |
| Voting Rule | 1 wallet = 1 vote per round, regardless of amount paid |
| Voting Type | Fully on-chain |
| Meme Submission Fee | Free |
| Meme Resubmission | Allowed — losing memes can be resubmitted in future rounds |
| Voting Round Structure | One meme per active voting slot (simpler for MVP) |
| SOL Raise Cap | 85 SOL per winning meme |
| Fundraise Time Limit | 48 hours after a meme wins ⚠️ *assumption* |
| Token Contract Creation | Automated on-chain upon cap fill |
| Token Supply | Variable — set by submitter at submission time |
| Wallet Requirement | Required to vote or fund; browsing is open to all |

> ⚠️ **Assumptions are subject to change** — flagged items above should be reviewed before development begins.

---

## 4. Economics & Token Distribution

### 4.1 SOL Raise Distribution (per 85 SOL raise)

> ⚠️ The following split is proposed and subject to change.

| Recipient | SOL Amount | Purpose |
|---|---|---|
| Meteora Liquidity Pool | 70 SOL (82%) | Seeded as initial trading liquidity for the token |
| Platform Fee | 10 SOL (12%) | Platform revenue |
| Meme Submitter Reward | 5 SOL (6%) | Reward to original submitter for creating the winning meme |

### 4.2 Token Supply Distribution

> ⚠️ Exact token supply split is TBD — the following is a suggested starting point.

- **IPO Contributors: ~80%** of total supply, distributed proportionally based on each wallet's SOL share of the raise
- **Platform: 0.5%** of total supply
- **Liquidity Pool: ~19.5%** of remaining supply, deposited into Meteora alongside the SOL

### 4.3 Refund Mechanism

If the 85 SOL cap is not reached within 48 hours of a meme winning the vote, the raise fails and all contributors are automatically refunded their SOL via the on-chain smart contract. No manual action is required from users.

---

## 5. Core Features (MVP)

### 5.1 Browse & Discover (No Wallet Required)
- Public landing page showing the currently active voting round
- Live vote count per meme (updates in real time)
- Countdown timer for the current 1-hour voting window
- View past winning memes and their launch status (Funded / Launched / Failed)
- View active fundraising rounds with SOL raised vs cap and time remaining

### 5.2 Wallet Connection
- Connect a Solana wallet (Phantom, Backpack, Solflare supported)
- Wallet required to vote or contribute SOL
- One wallet per session — no multi-wallet support in MVP

### 5.3 Meme Submission
- Any wallet-connected user can submit a meme for free
- Submission form fields:
  - Meme name (e.g. PEPEWIFHAT)
  - Ticker symbol (e.g. $PWH)
  - Short description / pitch (max 280 characters)
  - Image or GIF upload (the meme visual)
  - Total token supply (number set by submitter)
- Submitted memes enter a queue and are picked up for the next available voting slot
- Losing memes can be resubmitted in a future round by anyone

### 5.4 Voting
- Each voting round lasts exactly 1 hour
- One meme is up for vote at a time
- Voting costs 0.05 SOL per vote, paid on-chain
- 1 wallet = 1 vote maximum per round (paying more does not grant more votes)
- Votes are recorded on-chain in real time
- At the end of the hour, the vote count is finalized on-chain and the winning meme proceeds to fundraising
- Anti-manipulation: the 1-vote-per-wallet rule is enforced at the smart contract level

> ℹ️ Bots are partially mitigated by the 0.05 SOL cost and 1 wallet = 1 vote rule. Further bot protection can be added post-MVP.

### 5.5 Fundraising (IPO Phase)
- Winning meme enters a 48-hour fundraising window immediately after the vote ends
- Users contribute SOL toward the 85 SOL cap
- Contributions are held in an on-chain escrow smart contract
- Live progress bar shows SOL raised vs cap, and a countdown timer
- Any wallet can contribute; no minimum contribution amount
- If 85 SOL is reached before 48 hours: launch triggers automatically
- If 85 SOL is NOT reached in 48 hours: all contributions are automatically refunded on-chain

### 5.6 Token Launch & Liquidity Seeding
- On cap fill, the smart contract automatically:
  - Creates the token contract on Solana with the submitter-defined supply
  - Deposits 70 SOL + ~19.5% of token supply into a new Meteora liquidity pool
  - Distributes ~80% of token supply to IPO contributors proportionally
  - Sends 0.5% of supply to platform wallet
  - Sends 5 SOL reward to the meme submitter's wallet
  - Retains 10 SOL as platform revenue
- All of this happens in a single on-chain transaction sequence — no manual steps required
- A Solscan link is shown to users after launch confirmation

### 5.7 KOL Integration (Off-Platform for MVP)
- KOLs can submit memes and promote voting links manually
- No automated KOL payment or referral tracking in MVP
- KOL compensation to be handled off-platform for now

> ℹ️ KOL referral tracking and on-platform incentives are a post-MVP feature.

---

## 6. User Roles

| Role | Who They Are | What They Can Do |
|---|---|---|
| Visitor | Anyone browsing without a wallet | View active vote, past launches, fundraising progress |
| User (Wallet Connected) | Any wallet-connected visitor | All visitor actions + submit memes, vote, contribute SOL |
| Admin | Internal team | Moderate submissions, pause rounds, view platform analytics |

---

## 7. User Flows

### 7.1 Flow: Submitting a Meme

| # | Actor | Action | Detail |
|---|---|---|---|
| 1 | User | Connects Solana wallet | Phantom / Backpack / Solflare |
| 2 | User | Clicks "Submit a Meme" | Available from homepage |
| 3 | User | Fills submission form | Name, ticker, description, image/GIF, token supply |
| 4 | Platform | Validates submission | Checks required fields and image size limits |
| 5 | Platform | Adds meme to queue | Meme enters queue for next available voting slot |
| 6 | User | Sees confirmation | "Your meme is in the queue!" with estimated slot time |

### 7.2 Flow: Voting on a Meme

| # | Actor | Action | Detail |
|---|---|---|---|
| 1 | Platform | Displays active voting round | 1 meme shown; live vote count; 1-hour countdown timer |
| 2 | Visitor | Views meme details | Name, ticker, image, description, current vote count |
| 3 | User | Connects wallet (if not already) | Required to vote |
| 4 | User | Clicks "Vote" button | Triggers on-chain transaction for 0.05 SOL |
| 5 | Wallet | User approves transaction | 0.05 SOL deducted from wallet |
| 6 | Smart Contract | Records vote on-chain | 1 wallet = 1 vote enforced at contract level |
| 7 | Platform | Updates vote count live | Vote confirmed; count increments on UI |
| 8 | Platform | Round ends at 1 hour | Vote count finalized on-chain; winning meme proceeds to fundraise |

### 7.3 Flow: Contributing SOL to a Fundraise

| # | Actor | Action | Detail |
|---|---|---|---|
| 1 | Platform | Shows active fundraise | Winning meme with SOL progress bar and 48h timer |
| 2 | User | Connects wallet | — |
| 3 | User | Enters SOL amount to contribute | No minimum; any amount up to remaining cap |
| 4 | User | Clicks "Contribute" | On-chain transaction to escrow contract |
| 5 | Wallet | User approves transaction | SOL sent to escrow |
| 6 | Platform | Updates progress bar live | Shows new total raised |
| 7a | Smart Contract | [IF CAP REACHED] Auto-triggers launch | Immediately proceeds to token creation and distribution |
| 7b | Smart Contract | [IF 48h EXPIRES, CAP NOT MET] Auto-refunds all | Each contributor's SOL returned to their wallet |

### 7.4 Flow: Token Launch (Automatic on Cap Fill)

| # | Actor | Action | Detail |
|---|---|---|---|
| 1 | Smart Contract | Detects cap filled (85 SOL) | Triggered automatically — no human action needed |
| 2 | Smart Contract | Creates token on Solana | Using submitter's defined supply |
| 3 | Smart Contract | Seeds Meteora pool | 70 SOL + ~19.5% of token supply deposited |
| 4 | Smart Contract | Distributes ~80% of supply to contributors | Proportional to each wallet's SOL contribution |
| 5 | Smart Contract | Sends 0.5% of supply to platform wallet | — |
| 6 | Smart Contract | Sends 5 SOL to meme submitter's wallet | Submitter reward |
| 7 | Smart Contract | Retains 10 SOL as platform revenue | — |
| 8 | Platform | Shows launch confirmation to all users | Solscan link, token address, Meteora pool link |

---

## 8. Screen Inventory (MVP)

### Public Screens (No Wallet Required)
- **Homepage / Active Vote Screen** — current meme, live vote count, timer, Vote CTA
- **Active Fundraise Screen** — winning meme, SOL progress bar, 48h timer, Contribute CTA
- **Past Launches Feed** — list of all past winners with status (Launched / Funded / Failed)
- **Meme Submission Form** — name, ticker, description, image, token supply

### Authenticated Screens (Wallet Required to Interact)
- Same screens as above — wallet connection unlocks Vote and Contribute buttons
- **My Contributions** — personal history of SOL contributed, refund status, token allocations received

### Admin Screens
- **Submission Queue** — view and moderate incoming meme submissions
- **Round Management** — manually pause or skip a voting round if needed
- **Platform Analytics** — total SOL raised, tokens launched, contributor counts

---

## 9. Out of Scope for MVP

- KOL referral tracking or on-platform KOL payments
- Multiple memes competing simultaneously in one round
- Token vesting or lock-up schedules for contributors
- Secondary trading within the platform
- Mobile app
- Social features (comments, sharing)
- DAO governance
- KYC / AML

---

## 10. Open Questions & TBDs

| Open Question | Status |
|---|---|
| Exact token supply split between contributors / platform / liquidity | TBD |
| KOL compensation model for MVP | TBD — handled off-platform for now |
| Voting cost (0.05 SOL) — confirm this is right for target audience | Assumed — to be reviewed |
| Fundraise time limit (48h) — confirm this is appropriate | Assumed — to be reviewed |
| SOL raise distribution (70 / 10 / 5) — confirm split | Assumed — to be reviewed |
| Admin moderation policy — what gets rejected from submission queue? | TBD |
| What happens to voting SOL (0.05 per vote)? Platform revenue or burned? | TBD |

---

*MemeVote MVP PRD | v1.0 | February 2026 | For Internal Use Only*