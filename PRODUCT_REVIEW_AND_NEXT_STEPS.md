# Case alignment review: AI for the Indian Investor

## Problem fit (from provided Case #6)

Your strongest submission angle should shift from founder-investor matchmaking to an **Indian retail investor intelligence layer**:

- convert noisy market data into actionable decisions,
- explain technical + fundamental signals in plain English,
- support portfolio-aware decision workflows.

## Recommended build focus (pick one primary, demo all as roadmap)

1. **Opportunity Radar (Primary MVP)**
   - ingest filings, bulk/block deals, management commentary shifts, and regulatory updates,
   - rank top missed opportunities with confidence and rationale,
   - push daily alerts and sector-level heatmaps.

2. **Chart Pattern Intelligence (Secondary MVP)**
   - detect breakouts/reversals/divergences on NSE universe,
   - attach historical hit-rate context,
   - auto-generate plain-language "what this means" cards.

3. **Market Chat (Differentiator)**
   - source-cited answers from integrated market tools,
   - multi-step reasoning (signal -> scenario -> action plan),
   - portfolio-aware responses instead of generic market commentary.

4. **AI Market Video Engine (Stretch)**
   - auto-generate 30–90 sec daily market recap videos,
   - include FII/DII flows, IPO tracker, top sector rotation, and key alerts.

## What we changed in this repo

### Frontend

- Landing page copy and sections are now explicitly case-aligned to "AI for the Indian Investor".
- Added a visible "Case #6 Fit" block with the four proposed tracks.

### Backend

Added prototype endpoints to demonstrate technical depth in the live demo:

- `GET /india-investor/opportunity-radar`
- `GET /india-investor/chart-patterns/{symbol}`
- `POST /india-investor/market-chat`

These provide structured, explainable response formats and can be replaced with real pipelines later.

## Backend correctness notes (current status)

### Good for hackathon demo
- API shape is clean and easy to present.
- Health endpoint and modular routes are available.
- New India-investor endpoints make the case alignment explicit.

### Must-fix for production
- Replace in-memory data with Postgres.
- Add auth and environment-scoped CORS.
- Add strict schema/guardrails for LLM outputs.
- Add observability (latency, errors, model cost).
- Add risk disclaimers and compliance controls in user-facing surfaces.

## Live demo flow (judge-friendly)

1. Show Opportunity Radar list and explain one surfaced signal.
2. Open Chart Pattern endpoint for a ticker and show detected setups + probabilities.
3. Ask Market Chat a portfolio-aware question and show cited response objects.
4. Explain architecture path: ingestion -> signal engine -> LLM explainer -> UI delivery.

This directly supports judging criteria: technical depth, business impact, innovation, and strong demo storytelling.
