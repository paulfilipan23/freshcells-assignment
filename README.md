# Freshcells Frontend Trial — React + TypeScript + Vite

Two-screen SPA (Login → Account) using **Vite**, **React + TS**, **Mantine** for UI, and **Apollo Client** for GraphQL.

## Requirements

- **Node.js 22.x** (recommended)
- npm 10+

## Environment

Create a `.env` in the project root, with the GraphQL endpoint URL:

```
VITE_GRAPHQL_URL=
```

> Trial credentials are provided separately. Do not commit real credentials.

## Install & Run

```bash
# Install dependencies
npm i

# Start dev server
npm run dev
# Open http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

## What’s Inside

- **Vite** (React + TypeScript)
- **Mantine** for inputs, notifications, and basic styling
- **Apollo Client** for GraphQL requests
- **React Router** for `/login` and `/account`

## Behavior

- **Login**: authenticates against the provided GraphQL endpoint, stores JWT, redirects to Account.
- **Account**: displays logged-in user’s first/last name (read-only) and a logout button.
- **Logout**: clears auth and returns to Login.

## Notes

- Ensure `.env` contains the correct `VITE_GRAPHQL_URL`.
- Recommended Node version: **22.x**.
