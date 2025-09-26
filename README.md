# Shekinah Sons – Web App

Monorepo with React (Vite) frontend and Node/Express backend.

## Backend (server/)

- Dev: `cd server && npm i && npm run dev`
- Build: `npm run build`
- Start: `npm start`

Env variables (create `server/.env`):

```
MONGO_URI=your_mongodb_connection_string
PORT=4000
NODE_ENV=production
```

### Deploy to Render

This repo includes `render.yaml` for a blueprint deploy of the API.

1) Push to GitHub.
2) On Render, create a Blueprint from this repo.
3) Set env vars:
   - `MONGO_URI` (required)
   - `NODE_ENV=production`
4) Persistent Disk:
   - Name: `uploads`
   - Mount path: `/opt/render/project/src/server/uploads`
   - Size: 1GB (adjust as needed)
5) Health check path: `/api/health`

Build/Start are defined in `render.yaml`.

## Frontend (root/)

- Dev: `npm i && npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
