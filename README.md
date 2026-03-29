## Fintech Frontend + Backend Prototype
<p>This project is a hackathon prototype connecting startups with investors in a FinTech context. It features a JavaScript-based frontend (built with Vite) and a Python FastAPI backend. Startups can upload their pitch decks as PDFs, and the system matches them with investors based on investment thesis. The backend uses an in-memory data store (a simple Python dictionary) for quick prototyping
, with plans to switch to a persistent database in a full product. We also integrate an AI-powered intro service: for a given startup and investor, the /intro/{startup_id}/{investor_id} endpoint generates a draft introduction email using a language model.</p><br>

## System Architecture
The application has three layers: the Client (Frontend), the API (Backend), and the Data layer. The browser frontend (hosted by Vite) allows users to sign in as either a startup or an investor. Startups can upload a pitch deck (PDF) via a form. This is sent to the FastAPI backend at POST /startup/upload-deck. FastAPI handles the file upload using its UploadFile feature, which efficiently streams the file (spooling to disk if it’s large)
. Once processed, the backend updates its in-memory store of startups.<br><br>

Investors register via POST /investor/register with their name, firm, thesis, and preferred sectors/stages. The backend stores this in-memory as well. The matching logic then uses these records: GET /startup/{id}/matches returns investors whose preferences align with a given startup, and GET /investor/{id}/dealflow returns startups for an investor’s pipeline. Finally, the /intro/{startup_id}/{investor_id} endpoint uses our AI service to <br>draft a personalized intro email between the startup and investor.<br><br>

All API routes are documented by FastAPI with an auto-generated Swagger UI at /docs<br>
, allowing easy testing of endpoints. In our prototype, we skip a full database: as one expert notes, “start with a simple in-memory data store – a list of objects… and add persistence later when needed”<br>
. This speeds up hackathon development but should be replaced with a real database in production.<br>

## Authentication Flow
Local Demo Auth: There is no real backend authentication in this prototype. On the login screen, enter any non-empty name, email, and password to continue.<br>
Role Selection: After “logging in,” you choose a role:<br>
Startup → you go to the Startup Dashboard.<br>
Investor → you go to the Investor Dashboard.<br>
Session Persistence: The app saves the session in localStorage (browser storage) so you stay logged in. To reset, use the Logout button, which clears localStorage.<br>
Dashboards: Both dashboards are simple. A startup can upload its pitch deck PDF. An investor can register their thesis or view incoming startups (dealflow).<br>
Key API Endpoints<br>
POST /startup/upload-deck — Upload a startup pitch deck PDF (submitted as form-data). FastAPI’s UploadFile handles the incoming file efficiently<br>
.<br>
GET /startup/{id}/matches — Get investor matches for a startup (returns a JSON list of investor IDs and match details).<br>
POST /investor/register — Register a new investor by providing JSON with partner_name, firm_name, thesis, sectors, and stages.<br>
GET /investor/{id}/dealflow — Get the startup dealflow (a list of startup IDs) for a registered investor.<br>
GET /intro/{startup_id}/{investor_id} — Generate a draft intro email connecting the given startup and investor (uses our AI service under the hood).<br>
GET /docs — View the Swagger UI docs for all endpoints<br>
.
Each endpoint responds with JSON. For example, after registering an investor or uploading a deck, the response includes an ID (e.g. investor_id or startup_id) that you’ll use in later API calls.<br>

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

### Auth flow notes

- Frontend auth is currently local/demo mode (no backend auth API).
- Use any non-empty `name`, `email`, and `password` to continue.
- Role selected on sign-in decides dashboard route:
  - `startup` → startup dashboard
  - `investor` → investor dashboard
- Session is persisted in localStorage; use the `Logout` button to clear it.

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
