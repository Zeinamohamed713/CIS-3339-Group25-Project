# Data Platform Frontend

## Overview

This folder contains the Vue 3 frontend for the CIS 3339 Data Platform project.

The frontend uses:

- Vue 3
- Vite
- Vue Router
- Pinia
- Axios
- Tailwind CSS
- Vuelidate

The frontend communicates with the backend REST API through the URL configured in:

```text
frontend/.env
```

---

# Requirements

Before running the frontend, install:

- Node.js
- npm

The backend should also be running locally or deployed to a reachable server.

---

# Installation

Open a terminal in the frontend directory:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

---

# Environment Configuration

The frontend uses:

```text
frontend/.env
```

Example:

```env
VITE_ROOT_API=http://localhost:3000
```

## `VITE_ROOT_API`

`VITE_ROOT_API` is the base URL for the backend API.

For local development:

```env
VITE_ROOT_API=http://localhost:3000
```

For deployment, replace the value with the deployed backend URL.

Frontend source files use this environment variable instead of hard-coded API URLs.

---

# Development Server

Start the frontend development server with:

```powershell
npm run dev
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

When using this development server, the backend should allow:

```env
CORS_ORIGIN=http://localhost:5173
```

in:

```text
backend/.env
```

If `CORS_ORIGIN` is changed, restart the backend.

---

# Production Build

Create a production build with:

```powershell
npm run build
```

The production build is generated in:

```text
frontend/dist
```

A successful build should complete without unresolved imports.

---

# Serve the Production Build Locally

Serve the production build with:

```powershell
npm run serve
```

This runs the Vite production preview server.

The production preview is configured to use:

```text
http://localhost:5173
```

The frontend `package.json` uses:

```json
"serve": "vite preview --port 5173 --strictPort"
```

The backend should allow:

```env
CORS_ORIGIN=http://localhost:5173
```

in:

```text
backend/.env
```

Because development and production preview both use port `5173`, only one frontend server can run at a time. No CORS change is required when switching between the two modes.

---

# Production Preview Verification

After starting the production preview, verify:

- login works
- dashboard data loads
- client list loads
- event list loads
- service list loads
- API requests reach the backend
- session state survives browser refresh
- nested routes refresh correctly

A nested route such as:

```text
/clientdetails/:id
```

should reload normally when the production build is being served through the verified preview setup.

---

# Authentication and Session Behavior

The frontend stores the JWT returned by the backend after login.

On application startup, the frontend restores the saved session when the token is still valid.

The application restores:

- login state
- username
- role
- Axios authorization header

Expired or corrupted tokens are cleared.

Logging out clears both the stored token and the Pinia session state.

---

# Role-Based Navigation

The frontend uses Vue Router navigation guards.

Editor-only routes use route metadata so a viewer who manually enters an editor-only URL is redirected.

Frontend route protection improves the user experience, while backend authorization still provides the actual security enforcement.

---

# API Communication

Axios is used for API communication.

The API client uses:

```env
VITE_ROOT_API
```

as its base URL.

A centralized Axios response interceptor handles API errors and authentication failures.

Examples include:

- readable network error messages
- backend validation messages
- clearing the session after a `401`
- redirecting unauthorized sessions to `/login`

---

# Shared API State

Client, event, service, and dashboard views use a shared `useApi` composable.

The composable tracks:

- data
- loading
- error
- execute
- retry behavior

This provides consistent loading, error, and retry behavior across the application.

---

# Reusable Data Table

Client, event, and service lists use the shared `DataTable` component.

The table supports:

- ascending sorting
- descending sorting
- return to unsorted state
- visible sort indicators
- 10 rows per page
- pagination controls
- empty-results state
- row navigation

Representative seed data provides enough records to verify multiple pages.

---

# SPA Routing

The frontend is a single-page application using Vue Router.

For a production deployment, the static host must support SPA history fallback.

Unknown frontend routes should be rewritten to:

```text
index.html
```

Without SPA fallback, directly refreshing a nested route may return a server-level `404`.

---

# CORS Coordination

The frontend origin must match the backend's:

```env
CORS_ORIGIN
```

For development:

```text
Frontend:
http://localhost:5173

Backend:
CORS_ORIGIN=http://localhost:5173
```

For the production preview:

```text
Frontend:
http://localhost:5173

Backend:
CORS_ORIGIN=http://localhost:5173
```

Development and production preview use the same local origin. Only one frontend server should run at a time.

The backend only needs to be restarted if the `.env` configuration itself changes.

---

# Local Development Workflow

Use two terminals.

## Terminal 1 - Backend

From the project root:

```powershell
cd backend
npm start
```

## Terminal 2 - Frontend

From the project root:

```powershell
cd frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# Production Build Workflow

## Step 1 - Build

From the frontend directory:

```powershell
npm run build
```

## Step 2 - Verify Backend CORS

Confirm:

```env
CORS_ORIGIN=http://localhost:5173
```

is set in:

```text
backend/.env
```

No CORS change is required if the backend is already configured for the development frontend.

## Step 3 - Serve the Production Build

Run:

```powershell
npm run serve
```

The `serve` script uses:

```json
"serve": "vite preview --port 5173 --strictPort"
```

If port `5173` is already in use, stop the existing frontend process with `Ctrl + C` before running the preview.

Open:

```text
http://localhost:5173
```

## Step 4 - Verify

Confirm:

- login works
- API requests succeed
- dashboard loads
- clients load
- events load
- services load
- nested route refresh works
- no unresolved imports appear
- the application is using `VITE_ROOT_API`

---

# Demo Accounts

The backend initialization script provides these demo accounts.

## Viewer

```text
Username: user
Password: user
Role: viewer
```

## Editor

```text
Username: admin
Password: admin
Role: editor
```

The viewer can perform read-only workflows.

The editor can also perform create, update, delete, register, and deregister operations.

---

# Useful Commands

Install dependencies:

```powershell
npm install
```

Run the development server:

```powershell
npm run dev
```

Create the production build:

```powershell
npm run build
```

Serve the production build:

```powershell
npm run serve
```

---

# Troubleshooting

## Frontend shows "Unable to reach the server"

Verify:

1. the backend is running
2. `VITE_ROOT_API` points to the correct backend URL
3. `CORS_ORIGIN` in `backend/.env` matches the frontend origin
4. the backend was restarted after changing `.env`

For development:

```env
CORS_ORIGIN=http://localhost:5173
```

For production preview:

```env
CORS_ORIGIN=http://localhost:5173
```

No CORS change is required between development and production preview because both use port `5173`.

---

## Nested route returns 404 after refresh

The static host must be configured with SPA history fallback.

Unknown frontend routes must be served through:

```text
index.html
```

The Vite preview setup used for local verification supports the tested nested-route refresh workflow.

---

# Notes

- The frontend depends on the backend API being available.
- `VITE_ROOT_API` must point to the correct backend URL before building for deployment.
- Vite environment variables are included at build time.
- Changing `VITE_ROOT_API` for a production deployment requires rebuilding the frontend.
- The backend CORS configuration must allow the frontend origin.
- Development and production preview both use port `5173`, so only one frontend server should run at a time.
- The final course demo should use the production build rather than only the Vite development server.
