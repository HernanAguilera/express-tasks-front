# Next.js Todo App

### Tools used

- Next.js
- React
- Tailwind CSS (Styling)
- TypeScript
- Zustand (State Management)
- React-Toastify (Notifications)

## Installation

```bash
npm install
# or
pnpm install
```

### Environment variables

1. Create a `.env` file in the root of the project and add the following variables:

```bash
cp .env.example .env
```

2. Replace the value of `NEXT_PUBLIC_API_URL` with the URL of your API server.

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Start backend server

Before running the frontend, start the backend server: [backend-server](https://github.com/HernanAguilera/express-tasks-api)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
