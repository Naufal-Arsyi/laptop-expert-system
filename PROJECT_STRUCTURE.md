# 📁 Project Structure - React + Vite

## Struktur Folder

```
laptop-expert-system/
│
├── src/                          # React Source Code
│   ├── data/                     # Data & Constants
│   │   ├── gejala.js             # 30 Symptoms data
│   │   ├── penyakit.js           # 10 Diseases database
│   │   ├── rules.js              # 45 Diagnostic rules
│   │   ├── mockCases.js          # Sample service cases
│   │   └── cfLevels.js           # Certainty Factor levels
│   │
│   ├── engine/                   # Business Logic
│   │   └── calcCF.js             # Certainty Factor algorithm
│   │
│   ├── styles/                   # Styling
│   │   └── styles.js             # All UI styles (CSS-in-JS)
│   │
│   ├── components/               # React Components
│   │   └── Modal.jsx             # Modal wrapper component
│   │
│   ├── App.jsx                   # Main App component
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global CSS reset
│
├── app/                          # Python Backend (Flask)
│   ├── api/
│   │   └── app.py                # Flask API routes
│   ├── engine/
│   │   ├── certainty_factor.py
│   │   ├── diagnosis_engine.py
│   │   └── forward_chaining.py
│   ├── data/
│   │   ├── gejala.py
│   │   ├── kerusakan.py
│   │   └── rules.py
│   └── utils/
│       └── __init__.py
│
├── index.html                    # Vite template
├── vite.config.js                # Vite configuration
├── package.json                  # npm dependencies
├── requirements.txt              # Python dependencies
├── README.md                     # Project info
└── SETUP_COMPLETE.md             # Setup notes
```

---

## File Descriptions

### `src/data/` - Data Layer
- **gejala.js** - Array of 30 laptop symptoms with icons
- **penyakit.js** - Array of 10 possible laptop damages with repair costs
- **rules.js** - 45 rules connecting symptoms to diseases with expertise weights
- **mockCases.js** - Sample service cases for technician dashboard
- **cfLevels.js** - Confidence levels and labels for user input

### `src/engine/` - Business Logic
- **calcCF.js** - Implements Certainty Factor algorithm with forward chaining
  - Input: Selected symptoms with confidence levels
  - Output: Top 3 diseases with CF scores

### `src/styles/` - Presentation
- **styles.js** - All inline CSS-in-JS styles for components
  - Buttons, cards, forms, navigation, modals, etc.
  - Theme colors: Primary (#E8510A), WhatsApp (#25D366), Success (#22C55E)

### `src/components/` - Reusable UI
- **Modal.jsx** - Reusable modal dialog component with close button

### `src/App.jsx` - Main Component
React functional component that manages:
- State: Selected symptoms, diagnosis results, technician dashboard
- Pages: Landing, Symptoms selector, Results, Technician dashboard
- Features: WhatsApp integration, case management, diagnosis engine

### `src/main.jsx`
React entry point - renders App into #root div

### `src/index.css`
Global CSS reset for consistent cross-browser styling

---

## Key Improvements from Monolithic Structure

✅ **Separation of Concerns**
- Data separate from logic separate from UI
- Easy to modify rules or symptoms without touching components

✅ **Reusability**
- Modal component can be reused in multiple pages
- calcCF engine can be tested independently
- Styles are centralized for consistency

✅ **Maintainability**
- Each file has single responsibility
- Clear import paths and dependencies
- Easy to add new symptoms/diseases/rules

✅ **Scalability**
- Can add more components in `components/`
- Can add utilities in `src/utils/` if needed
- Can separate styles into multiple files if needed

---

## Development Workflow

### 1. Add New Symptom
1. Add entry to `src/data/gejala.js`
2. Export it in GEJALA array
3. Auto-imported in App.jsx

### 2. Add New Disease Type
1. Add entry to `src/data/penyakit.js`
2. Add rules in `src/data/rules.js`
3. CF algorithm automatically considers new disease

### 3. Modify Styles
1. Edit `src/styles/styles.js`
2. Changes apply immediately (HMR)

### 4. Add New Component
1. Create file in `src/components/ComponentName.jsx`
2. Import in `App.jsx`
3. Use in your pages

---

## Imports in App.jsx

```jsx
// Data imports
import { GEJALA } from "./data/gejala.js";
import { PENYAKIT } from "./data/penyakit.js";
import { RULES } from "./data/rules.js";
import { MOCK_CASES } from "./data/mockCases.js";
import { CF_LEVELS, CF_LABELS } from "./data/cfLevels.js";

// Engine imports
import { calcCF } from "./engine/calcCF.js";

// Style imports
import { FONTS, styles as s } from "./styles/styles.js";

// Component imports
import { Modal } from "./components/Modal.jsx";
```

---

## Running the Application

```bash
# Development server (with HMR)
npm run dev
# Access: http://localhost:5173/

# Build for production
npm run build

# Preview production build
npm run preview
```

---

**Status:** ✅ Clean, modular, production-ready structure
