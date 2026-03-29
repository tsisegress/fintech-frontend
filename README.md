# Fintech Frontend + Backend Prototype

## Backend setup

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# paste your real OPENAI_API_KEY in backend/.env
uvicorn main:app --reload --port 8000
```

API base URL from frontend: `http://localhost:8000`

### Key endpoints

- `POST /startup/upload-deck` — upload a startup pitch deck PDF
- `GET /startup/{id}/matches` — get investor matches for a startup
- `POST /investor/register` — register investor thesis/preferences
- `GET /investor/{id}/dealflow` — get startup dealflow for investor
- `GET /intro/{startup_id}/{investor_id}` — generate intro email
- `GET /docs` — interactive Swagger docs

## Frontend setup

```bash
npm install
npm run dev
```

Open Vite local URL (typically `http://localhost:5173`).

## Auth + role dashboards (frontend)

- Users first land on a simple auth screen and choose role (`startup` or `investor`).
- Startup users are routed to startup dashboard flow.
- Investor users are routed to investor dashboard flow.

## 3-minute API demo (copy/paste)

After backend is running on `http://localhost:8000`, run the following in a new terminal.

### 1) Register an investor

```bash
curl -s -X POST http://localhost:8000/investor/register \
  -H "Content-Type: application/json" \
  -d '{
    "partner_name":"Priya Mehta",
    "firm_name":"Nexus Venture Partners",
    "thesis":"We back fintech infrastructure startups in India.",
    "sectors":"Fintech, SaaS",
    "stages":"Seed, Series A"
  }'
```

Copy the `investor_id` from response.

### 2) Upload startup deck

```bash
curl -s -X POST http://localhost:8000/startup/upload-deck \
  -F "file=@/absolute/path/to/pitch-deck.pdf"
```

Copy the `startup_id` from response.

### 3) Get startup -> investor matches

```bash
curl -s "http://localhost:8000/startup/<startup_id>/matches"
```

### 4) Get investor dealflow

```bash
curl -s "http://localhost:8000/investor/<investor_id>/dealflow"
```

### 5) Generate intro email draft

```bash
curl -s "http://localhost:8000/intro/<startup_id>/<investor_id>"
```

### 6) (Optional) Case #6 demo endpoints

```bash
curl -s "http://localhost:8000/india-investor/opportunity-radar"
curl -s "http://localhost:8000/india-investor/chart-patterns/RELIANCE"
curl -s -X POST "http://localhost:8000/india-investor/market-chat" \
  -H "Content-Type: application/json" \
  -d '{"question":"Any near-term breakout opportunities?","portfolio":["INFY","HDFCBANK"]}'
```
