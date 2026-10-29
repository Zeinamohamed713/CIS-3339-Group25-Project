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
- Chart.js
- vue-toastification

The frontend communicates with the backend REST API through the URL configured in:

```text
frontend/.env
```

The application now includes:

- a public landing page
- a dedicated login page
- a protected role-based dashboard
- viewer and editor experiences
- reusable data tables
- centralized API state/error handling
- session restoration
- protected editor-only routes
- dashboard charts and activity visualizations

---

# Frontend Application Flow

The frontend is organized into three primary experiences.

## Public Landing Page

The root route:

```text
/
```

displays the public Community Center landing page.

The landing page introduces the platform and includes public informational sections for:

- community mission
- services
- events
- platform benefits
- community impact
- member login

The public landing page does not load protected organization records.

## Login Page

The login page is available at:

```text
/login
```

After successful authentication, the user normally continues to:

```text
/dashboard
```

If the user originally attempted to open another protected route, the application preserves the intended destination and redirects there after successful login.

## Dashboard

The authenticated dashboard is available at:

```text
/dashboard
```

The same dashboard view renders a different experience based on the authenticated role.

### Viewer Dashboard

The viewer dashboard is designed as a community portal.

It includes:

- welcome hero
- upcoming event summary
- available service summary
- community reach summary
- upcoming event cards
- featured services
- community snapshot chart
- recent community activity timeline

### Editor Dashboard

The editor dashboard is designed as an administrative operations dashboard.

It includes:

- client KPI
- upcoming event KPI
- service KPI
- attendance KPI
- quick actions
- upcoming event management
- attendance analytics
- `This Month` and `Upcoming` attendance views
- horizontal attendance chart
- recent event activity timeline
- community reach doughnut chart
- top ZIP-code areas

---

# Main Routes

```text
/                         Public landing page
/login                    Public login page
/dashboard                Protected dashboard

/findclient               Client directory
/clientdetails/:id        Client details
/clientform               Create client - editor only

/findevents               Event directory
/eventdetails/:id         Event details
/eventform                Create event - editor only

/findservice              Service directory
/servicedetails/:id       Service details
/serviceform              Create service - editor only
```

---

# Requirements

Before running the frontend, install:

- Node.js
- npm

The backend should also be running locally or deployed to a reachable server.

For the normal local setup, the backend runs at:

```text
http://localhost:3000
```

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

`VITE_ROOT_API` is the base URL for the backend REST API.

For local development:

```env
VITE_ROOT_API=http://localhost:3000
```

For deployment, replace the value with the deployed backend URL.

Frontend API files use this environment variable instead of depending on hard-coded API URLs.

Vite environment variables are included at build time, so changing `VITE_ROOT_API` for deployment requires rebuilding the frontend.

---

# Development Server

Make sure the backend is already running.

From the frontend directory run:

```powershell
npm run dev
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

The backend should allow this frontend origin:

```env
CORS_ORIGIN=http://localhost:5173
```

inside:

```text
backend/.env
```

If `CORS_ORIGIN` changes, restart the backend.

---

# Normal Local Development Workflow

Use two terminals.

## Terminal 1 - Backend

From the project root:

```powershell
cd backend
npm start
```

Backend:

```text
http://localhost:3000
```

Optional health check:

```text
http://localhost:3000/health
```

## Terminal 2 - Frontend

From the project root:

```powershell
cd frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Opening the frontend root displays the public landing page.

Select:

```text
Login
```

to continue to:

```text
/login
```

---

# Demo Accounts

The backend database initialization script provides these demo accounts.

## Viewer

```text
Username: user
Password: user
Role: viewer
```

The viewer can browse application data and use the community-facing dashboard.

## Editor

```text
Username: admin
Password: admin
Role: editor
```

The editor can additionally perform:

- create
- update
- delete
- event registration
- event deregistration

operations.

---

# Authentication and Session Behavior

The frontend stores the JWT returned by the backend after successful authentication.

On application startup, the frontend attempts to restore a previously saved valid session.

The application restores:

- login state
- username
- role
- Axios Authorization header

Expired or corrupted tokens are cleared.

A centralized unauthorized handler also clears frontend authentication state when protected API requests return `401`.

## Successful Login

Normal login flow:

```text
/login
   ↓
/dashboard
```

If the user was redirected to login while attempting to open another protected page, the original path is preserved.

Example:

```text
/findevents
   ↓
/login?redirect=/findevents
   ↓
successful login
   ↓
/findevents
```

## Logout

Logging out:

- removes the stored JWT
- clears Pinia authentication state
- returns the user to:

```text
/
```

---

# Role-Based Navigation

Vue Router navigation guards protect authenticated and editor-only routes.

Protected routes use:

```text
requiresAuth: true
```

Editor-only routes additionally use:

```text
requiresEditor: true
```

A viewer who manually enters an editor-only route such as:

```text
/clientform
/eventform
/serviceform
```

is redirected to:

```text
/dashboard
```

Frontend route protection improves user experience.

Backend authorization remains the actual security boundary.

---

# Navigation

`App.vue` provides one floating application navigation bar that changes based on authentication state.

## Logged Out

Public navigation contains:

- About
- Services
- Events
- Login

The About, Services, and Events links target sections on the public landing page.

## Logged In

Authenticated navigation contains:

- Dashboard
- Events
- Services
- Clients
- Logout

The brand link sends authenticated users to:

```text
/dashboard
```

and logged-out users to:

```text
/
```

---

# Public Landing Page

The landing page is implemented in:

```text
src/views/landing.vue
```

It uses a lighter public-facing design with:

- large hero typography
- Community Center branding
- service/program sections
- community information
- event-oriented content
- call-to-action sections
- member login links
- footer navigation

The landing page intentionally avoids protected API calls.

Protected client, service, event, attendance, and organization records remain behind authentication.

---

# Login Page

The login page is implemented in:

```text
src/views/login.vue
```

It provides:

- dedicated member access
- username/password inputs
- demo viewer credentials
- demo editor credentials
- link back to the public Community Center landing page

Authentication continues through the Pinia user store.

---

# Dashboard Design

The dashboard is implemented in:

```text
src/views/home.vue
```

It uses role-based rendering.

## Viewer Experience

The viewer dashboard focuses on:

- discovery
- participation
- services
- events
- community information

rather than administrative controls.

## Editor Experience

The editor dashboard focuses on:

- management
- monitoring
- quick actions
- event activity
- attendance analytics
- community metrics

This keeps both roles visually related while giving each role an interface appropriate to its responsibilities.

---

# Dashboard Charts

## Attendance Chart

The attendance visualization uses a horizontal Chart.js bar chart.

The editor dashboard supports two display modes:

```text
This Month
Upcoming
```

The chart limits displayed events to maintain readability.

## Community Reach

The ZIP-code visualization uses a doughnut chart.

The chart includes:

- client distribution
- central total count
- modern chart styling
- top ZIP-code area information in the editor dashboard

---

# Event Activity Timeline

Recent event information is displayed as an activity timeline rather than only as a traditional table.

The timeline includes:

- event name
- date
- registration/attendance count
- relative timing
- navigation to event details

The viewer experience uses a simplified community-activity version.

---

# API Communication

Axios is used for API communication.

The API client uses:

```env
VITE_ROOT_API
```

as its base URL.

A centralized Axios response interceptor handles:

- readable network errors
- backend validation messages
- authentication failures
- `401` session clearing

This prevents individual views from having to duplicate response handling.

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

# Loading, Error, Empty, and Retry States

List and dashboard views display appropriate UI for:

- loading
- backend/network errors
- empty results
- retry actions

Stopping the backend and refreshing an API-driven page should produce a readable error state instead of:

```text
[object Object]
```

or a blank screen.

After restarting the backend, Retry should allow the view to recover.

---

# Reusable Data Table

Client, event, and service list pages use the shared `DataTable` component.

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

# Editor Controls

Editor create controls are available from the relevant sections of the application.

Editor users can access:

```text
/clientform
/eventform
/serviceform
```

Viewer users do not receive mutation controls and cannot directly access those routes.

Backend authorization still protects all mutation endpoints even if a user manually attempts an API request.

---

# Production Build

Create a production build with:

```powershell
npm run build
```

The production output is generated in:

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

The frontend `package.json` uses:

```json
"serve": "vite preview --port 5173 --strictPort"
```

The production preview runs at:

```text
http://localhost:5173
```

The backend should allow:

```env
CORS_ORIGIN=http://localhost:5173
```

Development and production preview both use port `5173`, so only one frontend server can run at a time.

No CORS change is required when switching between development mode and local production preview.

---

# Production Preview Verification

After starting the production preview, verify:

## Public Flow

- `/` loads the landing page
- landing-page navigation works
- Login opens `/login`

## Authentication

- viewer login works
- editor login works
- login normally redirects to `/dashboard`
- session state survives refresh
- logout returns to `/`

## Viewer

- viewer dashboard loads
- clients load
- events load
- services load
- detail pages load
- editor-only routes redirect away

## Editor

- editor dashboard loads
- quick actions work
- client create/update/delete works
- event create/update/delete works
- service create/update/delete works
- registration/deregistration workflows work

## UI State

- loading states display correctly
- errors display correctly
- retry actions work
- empty search results display correctly
- table sorting works
- pagination works

## Routing

Nested routes should refresh normally in the verified preview setup.

Example:

```text
/clientdetails/<id>
```

---

# SPA Routing

The frontend is a single-page application using Vue Router with browser history.

For production deployment, the static host must support SPA history fallback.

Unknown frontend routes should be rewritten to:

```text
index.html
```

Without SPA fallback, directly refreshing routes such as:

```text
/dashboard
/clientdetails/<id>
/eventdetails/<id>
/servicedetails/<id>
```

may return a server-level `404`.

The Vite preview setup used for local verification supports the tested nested-route refresh workflow.

---

# CORS Coordination

The frontend origin must match the backend:

```env
CORS_ORIGIN
```

Local development:

```text
Frontend:
http://localhost:5173

Backend:
CORS_ORIGIN=http://localhost:5173
```

Local production preview:

```text
Frontend:
http://localhost:5173

Backend:
CORS_ORIGIN=http://localhost:5173
```

The backend only needs to be restarted if `.env` itself changes.

---

# Production Build Workflow

## Step 1 - Make Sure the Backend Is Running

```powershell
cd backend
npm start
```

## Step 2 - Build the Frontend

From the frontend directory:

```powershell
npm run build
```

## Step 3 - Verify Backend CORS

Confirm:

```env
CORS_ORIGIN=http://localhost:5173
```

inside:

```text
backend/.env
```

## Step 4 - Serve the Build

```powershell
npm run serve
```

If port `5173` is already occupied by `npm run dev`, stop it first with:

```text
Ctrl + C
```

## Step 5 - Open the Application

```text
http://localhost:5173
```

## Step 6 - Verify the Full Flow

Confirm:

- landing page
- login
- logout
- role-based dashboards
- clients
- events
- services
- CRUD
- registration
- sorting
- pagination
- charts
- API communication
- session refresh
- nested-route refresh

---

# Useful Commands

Install dependencies:

```powershell
npm install
```

Run development server:

```powershell
npm run dev
```

Create production build:

```powershell
npm run build
```

Serve production build:

```powershell
npm run serve
```

---

# Troubleshooting

## Frontend Shows "Unable to Reach the Server"

Verify:

1. MongoDB is running
2. the backend is running
3. `VITE_ROOT_API` points to the backend
4. `CORS_ORIGIN` matches the frontend origin
5. the backend was restarted after any `.env` change

Expected local frontend environment:

```env
VITE_ROOT_API=http://localhost:3000
```

Expected local backend CORS:

```env
CORS_ORIGIN=http://localhost:5173
```

---

## Login Succeeds but Returns to the Public Landing Page

Verify the Pinia authentication store redirects successful login to:

```text
/dashboard
```

rather than the old authenticated root route:

```text
/
```

---

## Dashboard Route Redirects to Login

Verify:

- the JWT exists
- the token is still valid
- session restoration has completed
- the Authorization header was restored
- the backend is reachable

---

## Viewer Can Reach an Editor Form

Verify the router metadata includes:

```text
requiresEditor: true
```

for:

```text
/clientform
/eventform
/serviceform
```

and verify the global route guard redirects viewers to:

```text
/dashboard
```

---

## Nested Route Returns 404 After Refresh

The production host must support SPA history fallback.

Unknown frontend routes must be served through:

```text
index.html
```

---

## Port 5173 Is Already In Use

Development and production preview both use:

```text
5173
```

Stop the currently running frontend process with:

```text
Ctrl + C
```

before starting the other mode.

---

# Notes

- The frontend depends on the backend API being available for authenticated data.
- The public landing page intentionally avoids protected API data.
- `VITE_ROOT_API` must point to the correct backend URL before building for deployment.
- Vite environment variables are included at build time.
- Changing `VITE_ROOT_API` for deployment requires rebuilding the frontend.
- Backend CORS must allow the frontend origin.
- Development and production preview both use port `5173`.
- Only one frontend process should use port `5173` at a time.
- Backend authorization remains required even though the frontend hides editor-only controls.
- The final course demo should use the production build rather than only the Vite development server.
