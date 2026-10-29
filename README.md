# CIS 3339 Data Platform

## Project Overview

The CIS 3339 Data Platform is a full-stack MEVN application for managing community clients, services, events, event registration, organization-specific data, and role-based dashboards.

The project uses:

- MongoDB for persistent data
- Express and Node.js for the backend REST API
- Vue 3 with `<script setup>` for the frontend
- Pinia for authentication/session state
- Vue Router for navigation and route protection
- Axios for API communication
- Vite for development and production builds
- Tailwind CSS for styling
- Chart.js for dashboard visualizations
- JWT for authentication
- bcrypt for password hashing

The application supports two authenticated roles:

- **Viewer**
- **Editor**

Viewer accounts can browse application data and use the community-facing dashboard.

Editor accounts can also create, update, and delete records, register or deregister clients for events, and use the administrative operations dashboard.

All client, service, and event data is restricted to the organization associated with the authenticated user's JWT.

---

# Current Application Experience

The application now contains three distinct user experiences.

## Public Landing Page

The root route:

```text
/
```

is a public Community Center landing page.

The landing page introduces the platform without exposing protected organization data. It contains public informational sections for:

- Community Center mission
- community services
- community events
- platform benefits
- community impact
- member login

The public landing page does **not** call protected client, service, event, attendance, or organization APIs.

## Login Page

The login route is:

```text
/login
```

The login page provides a separate member-access experience and includes demo credentials for both roles.

Successful login normally redirects the user to:

```text
/dashboard
```

If an unauthenticated user first attempted to access another protected route, the application preserves that route in a redirect query and returns the user there after successful login.

## Authenticated Dashboard

The authenticated dashboard route is:

```text
/dashboard
```

The same `home.vue` view renders a different dashboard based on the authenticated user's role.

### Viewer Dashboard

The viewer experience is designed as a community portal and includes:

- community-focused welcome hero
- upcoming event summary
- service discovery
- community reach information
- upcoming event cards
- featured services
- community snapshot visualization
- recent community activity timeline

### Editor Dashboard

The editor experience is designed as an operations dashboard and includes:

- organization activity overview
- total-client KPI
- upcoming-event KPI
- service KPI
- attendance KPI
- quick-create actions
- upcoming event management
- attendance analytics
- `This Month` and `Upcoming` attendance filters
- horizontal attendance chart
- recent event activity timeline
- community reach doughnut chart
- top ZIP-code areas

---

# Main Frontend Routes

```text
/                         Public landing page
/login                    Public login page
/dashboard                Authenticated dashboard

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

Routes requiring authentication use Vue Router metadata.

Editor-only create routes use:

```text
requiresEditor: true
```

A viewer who manually attempts to access an editor-only route is redirected to:

```text
/dashboard
```

---

# Project Structure

```text
project/
│
├── README.md
├── Project-README.md
│
├── backend/
│   ├── app.js
│   ├── db_init.js
│   ├── auth/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── composables/
    │   ├── router/
    │   ├── store/
    │   ├── views/
    │   │   ├── landing.vue
    │   │   ├── login.vue
    │   │   ├── home.vue
    │   │   └── ...
    │   ├── App.vue
    │   └── main.js
    ├── package.json
    └── .env
```

---

# Major Frontend Improvements

## Vue 3 `<script setup>`

Application views and components were migrated to Vue 3 `<script setup>` syntax while preserving application behavior.

## Public Landing and Authentication Flow

The original authenticated root route was reorganized into:

```text
/            public landing page
/login       login
/dashboard   protected dashboard
```

The floating navigation in `App.vue` now changes based on authentication state.

### Logged Out Navigation

Public navigation provides:

- About
- Services
- Events
- Login

### Logged In Navigation

Authenticated navigation provides:

- Dashboard
- Events
- Services
- Clients
- Logout

Editor users additionally receive editor-specific application controls where appropriate.

## Role-Specific Dashboards

The dashboard was redesigned so viewers and editors no longer receive nearly identical experiences.

The viewer dashboard focuses on discovery and community participation.

The editor dashboard focuses on management, metrics, analytics, and quick actions.

## Attendance Visualization

The attendance chart was redesigned as a horizontal Chart.js bar chart.

The editor dashboard supports:

```text
This Month
Upcoming
```

views and limits the chart to a readable set of events.

## Community Reach Visualization

The ZIP-code distribution chart was redesigned as a larger doughnut visualization with a total-client count in the center.

## Event Activity Timeline

Recent event performance was redesigned from a traditional table into a timeline/activity feed.

## Reusable Data Table

Client, event, and service list pages share a reusable `DataTable` component supporting:

- sorting
- ascending order
- descending order
- unsorted state
- visible sort indicators
- 10 rows per page
- pagination
- empty result state
- row navigation

## Section-Specific Create Controls

Editor create actions are available from the related application areas rather than relying only on one global create navigation pattern.

Viewer users do not receive editor mutation controls.

---

# Frontend API and Error Handling

Frontend API behavior uses a shared `useApi` composable to track:

- data
- loading state
- errors
- execution
- retries

Axios response handling is centralized.

Readable application errors are displayed instead of raw Axios response objects or `[object Object]`.

A centralized unauthorized handler clears invalid frontend authentication state when a protected request returns `401`.

---

# Authentication and Session Behavior

The backend uses JSON Web Tokens.

A successful JWT contains organization and user information including:

```text
username
role
orgId
```

After login, the frontend stores/restores:

- login state
- username
- role
- Axios Authorization header

Session restoration runs before Vue Router begins normal application navigation.

Expired or corrupted JWTs are cleared.

Logging out:

- removes the saved token
- clears Pinia authentication state
- returns the user to the public landing page

---

# Backend Authorization

Protected backend routes use reusable authentication and authorization middleware such as:

```text
requireAuth
requireRole('editor')
```

`requireAuth` returns HTTP `401` when no valid JWT is provided.

`requireRole('editor')` returns HTTP `403` when an authenticated non-editor attempts an editor-only mutation.

Backend authorization is enforced independently from frontend route visibility.

---

# Organization Isolation

Client, event, and service queries are restricted to:

```text
req.user.orgId
```

The backend does not trust organization ownership supplied by the browser.

Shared organization-scoping logic prevents users from accessing or modifying another organization's records.

Cross-organization records behave as unavailable to the authenticated organization.

---

# Event Registration and Deregistration

Event registration requires the editor role.

Both the selected client and selected event must belong to the authenticated user's organization.

Registering the same client for the same event more than once is idempotent.

Example:

```json
{
  "message": "Already registered"
}
```

Deregistering a client who is already absent is also handled safely.

Example:

```json
{
  "message": "Not registered"
}
```

These operations do not create duplicate or invalid registration state.

---

# Backend Error Handling

API errors use JSON responses in the format:

```json
{
  "error": "Human readable message"
}
```

Raw MongoDB errors, secrets, and stack traces are not returned to normal API clients.

The backend includes handling for common:

- `400`
- `401`
- `403`
- `404`
- `500`

responses.

---

# Health Check

The backend provides:

```text
GET /health
```

Authentication is not required.

Expected response while MongoDB is connected:

```json
{
  "status": "ok",
  "db": "connected"
}
```

Use this endpoint first when confirming that a clean setup is working.

---

# Database Initialization

The application includes an idempotent database initialization command:

```powershell
npm run db:init
```

The initializer creates or verifies required seed data such as:

- configured organization
- viewer user
- editor user
- representative clients
- representative services
- representative events
- sample event registrations

The command is designed to be safely run more than once.

Running:

```powershell
npm run db:init
npm run db:init
```

should not duplicate the seeded organization, users, clients, services, or events.

The initializer also preserves separately created application records.

---

# Prerequisites

Install the following before running the project:

- Node.js
- npm
- MongoDB
- Git

MongoDB may run locally or through a compatible MongoDB deployment.

The local instructions below assume MongoDB is available at:

```text
mongodb://127.0.0.1:27017
```

---

# Environment Configuration

## Backend

Create or verify:

```text
backend/.env
```

Example local configuration:

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/cis3339_project
ORG_ID=6ac98d9c1b9fe52f029f044f
JWT_SECRET=cis3339_project_local_secret_2026_change_me
CORS_ORIGIN=http://localhost:5173

SEED_VIEWER_USERNAME=user
SEED_VIEWER_PASSWORD=user
SEED_EDITOR_USERNAME=admin
SEED_EDITOR_PASSWORD=admin
```

### Backend Variables

`PORT`

```env
PORT=3000
```

Port used by Express.

`MONGO_URL`

```env
MONGO_URL=mongodb://127.0.0.1:27017/cis3339_project
```

MongoDB connection string.

`ORG_ID`

Configures the organization used by the local course-project instance and seed data.

`JWT_SECRET`

Signing key used by the course project to create and verify JWTs.

`CORS_ORIGIN`

```env
CORS_ORIGIN=http://localhost:5173
```

Restricts browser API access to the frontend origin.

`SEED_VIEWER_USERNAME` / `SEED_VIEWER_PASSWORD`

Credentials created by the database initializer for the viewer demo account.

`SEED_EDITOR_USERNAME` / `SEED_EDITOR_PASSWORD`

Credentials created by the database initializer for the editor demo account.

Passwords are stored in MongoDB as bcrypt hashes rather than plaintext values.

## Frontend

Create or verify:

```text
frontend/.env
```

Example:

```env
VITE_ROOT_API=http://localhost:3000
```

The frontend uses `VITE_ROOT_API` as the backend API base URL instead of embedding API addresses throughout the source code.

---

# Quick Start - Clean Machine to Working Application

The following is the recommended path for a new developer, teammate, or grader.

## 1. Clone the Repository

```powershell
git clone <repository-url>
cd <repository-folder>
```

Verify that the root contains:

```text
README.md
Project-README.md
backend/
frontend/
```

## 2. Start MongoDB

Make sure MongoDB is installed and running.

For the local configuration in this README, MongoDB must be reachable at:

```text
mongodb://127.0.0.1:27017
```

## 3. Configure Backend Environment

Verify:

```text
backend/.env
```

contains the required values described above.

For local development, the important values are:

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/cis3339_project
CORS_ORIGIN=http://localhost:5173
```

## 4. Install Backend Dependencies

Open a terminal from the project root:

```powershell
cd backend
npm install
```

## 5. Initialize the Database

Still inside the backend directory:

```powershell
npm run db:init
```

The initializer should create or verify the organization, users, clients, services, events, and sample registration data.

It is safe to run again:

```powershell
npm run db:init
```

A second run should not create duplicate seed records.

## 6. Start the Backend Server

From:

```text
backend/
```

run:

```powershell
npm start
```

The backend should become available at:

```text
http://localhost:3000
```

Leave this terminal running.

## 7. Verify the Backend

Open:

```text
http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok",
  "db": "connected"
}
```

If this does not work, resolve the backend or MongoDB connection before starting frontend troubleshooting.

## 8. Configure Frontend Environment

Verify:

```text
frontend/.env
```

contains:

```env
VITE_ROOT_API=http://localhost:3000
```

## 9. Install Frontend Dependencies

Open a **second terminal** from the project root:

```powershell
cd frontend
npm install
```

## 10. Start the Frontend

From:

```text
frontend/
```

run:

```powershell
npm run dev
```

Vite should make the application available at:

```text
http://localhost:5173
```

Leave both terminals running:

```text
Terminal 1
backend/
npm start

Terminal 2
frontend/
npm run dev
```

## 11. Open the Product

Open:

```text
http://localhost:5173
```

The first screen should be the public Community Center landing page.

From there select:

```text
Login
```

to open:

```text
http://localhost:5173/login
```

---

# Demo Accounts

## Viewer

```text
Username: user
Password: user
Role: viewer
```

After login the viewer is sent to:

```text
/dashboard
```

The viewer receives the community-facing dashboard.

Viewer access includes:

- dashboard
- client directory
- event directory
- service directory
- client details
- event details
- service details
- community event/service discovery

The viewer cannot perform editor-only mutations.

## Editor

```text
Username: admin
Password: admin
Role: editor
```

After login the editor is sent to:

```text
/dashboard
```

The editor receives the administrative operations dashboard.

Editor access includes viewer capabilities plus:

- create clients
- update clients
- delete clients
- create events
- update events
- delete events
- create services
- update services
- delete services
- register clients for events
- deregister clients from events
- dashboard quick actions
- administrative analytics

---

# Recommended Verification Checklist

After installation, use the following checklist before considering the setup complete.

## Public Experience

Confirm:

- `/` loads without authentication
- public landing-page navigation works
- landing-page sections scroll correctly
- protected organization records are not loaded into the public page
- Login opens `/login`

## Authentication

Confirm:

- `user / user` logs in
- `admin / admin` logs in
- successful login goes to `/dashboard`
- browser refresh keeps a valid session
- corrupted or expired sessions are cleared
- logout returns to `/`

## Viewer Authorization

While logged in as `user`:

- open the dashboard
- browse clients
- browse events
- browse services
- open detail pages

Attempt to directly open:

```text
/clientform
/eventform
/serviceform
```

The viewer should be redirected to:

```text
/dashboard
```

A viewer attempting an editor-only API mutation should receive HTTP:

```text
403
```

with a response similar to:

```json
{
  "error": "Forbidden"
}
```

## Editor Workflows

While logged in as `admin`, verify:

### Clients

- list
- search
- sort
- pagination
- details
- create
- update
- delete

### Events

- list
- search
- sort
- pagination
- details
- create
- update
- delete

### Services

- list
- search
- sort
- pagination
- details
- create
- update
- delete

### Registration

- register a client for an event
- attempt the same registration again
- deregister the client
- attempt the same deregistration again

Duplicate operations should remain safe and idempotent.

## Dashboard

Viewer dashboard should display community-oriented content.

Editor dashboard should display:

- KPI cards
- quick actions
- upcoming events
- attendance analytics
- month/upcoming toggle
- event activity timeline
- ZIP-code/community reach visualization

## Loading and Error States

Stop the backend while the frontend is running.

Refresh a list or dashboard view.

The frontend should show a readable error state with retry behavior rather than a blank screen or raw Axios object.

Restart the backend and use Retry.

The page should recover.

## Empty Results

Perform a search that matches no records.

The shared table should display a clear no-results state.

---

# Production Frontend Build

## Build

Stop the Vite development server if necessary.

From:

```text
frontend/
```

run:

```powershell
npm run build
```

The production bundle is generated in:

```text
frontend/dist
```

The build should complete without unresolved imports.

## Serve the Production Build Locally

From:

```text
frontend/
```

run:

```powershell
npm run serve
```

The project uses:

```json
"serve": "vite preview --port 5173 --strictPort"
```

The preview is available at:

```text
http://localhost:5173
```

Development and production preview both use port `5173`, so only one frontend server can use that port at a time.

The backend can remain configured with:

```env
CORS_ORIGIN=http://localhost:5173
```

## Production Preview Verification

Verify:

- public landing page
- login
- logout
- viewer dashboard
- editor dashboard
- client list/details
- event list/details
- service list/details
- sorting
- pagination
- create/update/delete editor workflows
- event registration
- session restoration
- API communication
- direct nested-route refresh

---

# SPA Routing and Deployment

The frontend uses Vue Router with browser history.

A static production host must support SPA history fallback.

Unknown frontend paths should be served through:

```text
index.html
```

Without this fallback, refreshing a route such as:

```text
/dashboard
/clientdetails/<id>
/eventdetails/<id>
/servicedetails/<id>
```

may result in a server-level `404` even though Vue Router knows the route.

For deployment:

- build `frontend/dist`
- configure SPA history fallback
- set `VITE_ROOT_API` to the deployed backend URL before building
- set backend `CORS_ORIGIN` to the deployed frontend origin

---

# CORS

The backend does not allow every browser origin.

Local configuration:

```env
CORS_ORIGIN=http://localhost:5173
```

The backend must be restarted after changing `.env`.

For deployment, change this value to the deployed frontend origin.

---

# Useful Commands

## Backend

Install:

```powershell
cd backend
npm install
```

Initialize database:

```powershell
npm run db:init
```

Start backend:

```powershell
npm start
```

Backend URL:

```text
http://localhost:3000
```

Health check:

```text
http://localhost:3000/health
```

## Frontend Development

Install:

```powershell
cd frontend
npm install
```

Start:

```powershell
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Frontend Production

Build:

```powershell
cd frontend
npm run build
```

Preview:

```powershell
npm run serve
```

---

# Known Limitations

- The project currently uses one configured organization per application deployment.
- CORS accepts one configured frontend origin at a time.
- Development and production preview both use port `5173`.
- Only one frontend process can bind to port `5173` at a time.
- Deployment-specific SPA fallback configuration depends on the hosting provider.
- A deployed build requires the correct backend URL in `VITE_ROOT_API`.
- The backend must allow the deployed frontend origin through `CORS_ORIGIN`.
- The public landing page intentionally presents informational content rather than exposing protected organization records.
- Automated bonus tests are not included unless added separately.

---

# AI Usage

Generative AI tools were used as a development and learning aid during this project.

AI assistance was used to help with:

- understanding unfamiliar Vue, Pinia, Axios, Express, and MongoDB code
- explaining existing project structure and application flow
- migrating Vue components and views to `<script setup>`
- reviewing reusable component design
- troubleshooting routing and authentication behavior
- reviewing JWT session restoration
- reviewing frontend route guards and editor-only access
- reviewing backend authentication and role authorization
- reviewing organization-level data isolation
- reviewing event registration and deregistration behavior
- troubleshooting CORS and frontend/backend communication
- troubleshooting development and production preview behavior
- improving dashboard layout and frontend usability
- reviewing implementation against project acceptance criteria
- improving project documentation and reproduction instructions

## Example AI Prompt Types

Prompts and follow-up questions included requests such as:

- explain how the existing Vue component works before changing it
- help migrate an existing Vue component to `<script setup>` while preserving behavior
- review authentication and route-guard logic for viewer and editor roles
- review backend routes for organization isolation and editor authorization
- help troubleshoot Axios, CORS, routing, and session-restoration issues
- improve dashboard presentation without removing required functionality
- review project requirements and identify missing acceptance criteria
- help document how another developer or grader can reproduce the project locally

AI was also used through iterative follow-up questions when an initial suggestion needed clarification, debugging, or adjustment.

## Review and Revision of AI Output

AI-generated code and suggestions were not accepted automatically.

Suggested changes were:

1. compared against the existing project code
2. adjusted to preserve the original project requirements
3. copied into the local project only after review
4. tested in the running frontend and backend
5. revised when browser behavior, API behavior, or assignment requirements did not match the intended result

For frontend work, changes were visually tested in the browser and checked against both viewer and editor roles.

For backend work, authentication, authorization, organization isolation, health responses, API errors, event registration, and event deregistration were tested before the changes were considered complete.

## Follow-Up Questions and Iteration

Follow-up questions were used throughout development to:

- correct routing behavior after introducing the public landing page
- preserve login redirects after moving the dashboard from `/` to `/dashboard`
- refine viewer and editor dashboard differences
- improve chart readability
- adjust loading, empty, and retry states
- verify that viewer users could not access editor-only functionality
- verify that frontend improvements did not remove required backend or CRUD behavior
- improve the README and clean-machine setup process

This iterative process was important because some AI suggestions required modification to fit the existing application architecture.

## What Was Learned

Using AI as a guided development aid helped reinforce understanding of:

- Vue 3 Composition API and `<script setup>`
- reactive state and computed properties
- reusable Vue components
- Pinia authentication state
- Vue Router navigation guards
- protected and editor-only routes
- centralized Axios configuration and response handling
- JWT authentication and session restoration
- Node.js and Express middleware
- backend role-based authorization
- MongoDB organization scoping
- idempotent database initialization
- safe event registration and deregistration
- frontend loading, error, retry, and empty states
- CORS configuration
- Vite development and production builds
- SPA route fallback behavior
- separating public, viewer, and administrative application experiences

AI was treated as a development assistant rather than a replacement for testing or understanding the code. Final changes were reviewed and tested against the working application before being retained.
---

# Final Local Startup Summary

For a previously configured machine, normal startup requires only two terminals.

## Terminal 1 - Backend

```powershell
cd backend
npm start
```

## Terminal 2 - Frontend

```powershell
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

For a completely new machine, run the full installation process in the **Quick Start - Clean Machine to Working Application** section first.
