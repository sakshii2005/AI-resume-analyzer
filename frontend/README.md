# Resume Analyzer Dashboard

Production-style React dashboard for the Resume Analyzer API. Built with Vite, TailwindCSS, and Axios.

## Run locally

Ensure the FastAPI backend is running at `http://127.0.0.1:8000`, then:

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # optional: preview production build
```

## Project structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Navbar.jsx
    │   ├── TextInputCard.jsx
    │   ├── ResultGrid.jsx
    │   ├── SentimentCard.jsx
    │   ├── ToneCard.jsx
    │   ├── ATSCard.jsx
    │   ├── KeywordsCard.jsx
    │   ├── SuggestionsCard.jsx
    │   └── ProgressBar.jsx
    └── pages/
        └── Dashboard.jsx
```

## API

The app sends `POST /analyze` with `{ "text": "..." }` to the backend. Configure the base URL in `src/pages/Dashboard.jsx` (`API_BASE`) if your backend runs elsewhere.
