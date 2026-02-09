# AI Student Advisor (MVP Stage)

A full-stack AI chat assistant that helps students with academic questions.  
Built with **Vite + React + TypeScript** on the frontend and **Express + Node.js** on the backend, powered by the **Dify API** for AI responses.

Here you can find the deployed version:
https://ai-student-advisor-1.onrender.com

---
> **Status: MVP**
>
> This version demonstrates the core functionality — chat integration, backend communication with Dify API, and a basic UI.  
> Future versions will include user authentication, progress tracking, and improved UI/UX.

---

## Features
- Chat with Dify-powered academic assistant through a custom UI
- Contextful conversations using Dify conversation IDs
- Suggested academic actions (Check prerequisites, Check GPA, View Milestones)
- Fast, modern stack (Vite + React + TypeScript + Express)
- Built-in linting, formatting, and pre-commit hooks

---

## Monorepo Structure
- `client/` — React app (Vite, TypeScript)
- `server/` — Express API proxy to Dify (ESM syntax)

---

## Setup Instructions

### 1. Clone & Install
```bash
git clone https://github.com/MariyamDp/AI-student-advisor.git
cd AI-student-advisor
# In the root
cd server && npm install
cd ../client && npm install
```

### 2. Environment Variables

#### Server (`server/.env`):
```
# Required: your Dify API key
API_KEY=your-dify-api-key-here
BASE_URL=https://api.dify.ai/v1
```

#### Client (`client/.env`):
```
# Where your server runs
VITE_SERVER_URL=http://localhost:3001
```

---

### 3. Running Locally

#### In two terminals:
- **Server:**
  ```
  cd server
  npm run dev
  ```
- **Client:**
  ```
  cd client
  npm run dev
  ```

---

## Linting, Formatting, and Husky
- Both `client/` and `server/` use ESLint, Prettier, Husky, and lint-staged for code quality.
- Run linter or formatter manually:
  ```
  npm run lint   # for lint checks
  npm run format # for Prettier autoformat
  ```
- Husky runs lint-staged on commit.
