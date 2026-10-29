# CIS 3339 Data Platform

## Project Overview

This project is a full-stack MEVN application used to manage clients, services, events, event registration, and organization-specific dashboard information.

The application uses:

- MongoDB for persistent data
- Express and Node.js for the backend REST API
- Vue 3 for the frontend
- Pinia for frontend state management
- Vue Router for navigation
- Axios for API communication
- Vite for development and production builds
- Tailwind CSS for styling
- JWT for authentication
- bcrypt for password hashing

The application supports two user roles:

- Viewer
- Editor

Viewer accounts can read application data.

Editor accounts can read data and perform create, update, delete, register, and deregister operations.

All client, service, and event data is restricted to the organization associated with the authenticated user's JWT.

---

## Project Structure

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
    │   └── views/
    ├── package.json
    └── .env
```

---

## Prerequisites

Install the following before running the application:

- Node.js
- npm
- MongoDB

MongoDB may run locally or through a compatible MongoDB deployment.

This project was developed and tested using Node.js, npm, and MongoDB.

---

## Backend Environment Configuration

Use the committed:

```text
backend/.env
```

Example configuration:

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

### Backend environment variables

### `PORT`

Port used by the Express backend.

Example:

```env
PORT=3000
```

### `MONGO_URL`

MongoDB connection string.

Example:

```env
MONGO_URL=mongodb://127.0.0.1:27017/cis3339_project
```

### `ORG_ID`

Organization ID used to configure this application instance and initialize the demo organization.

Example:

```env
ORG_ID=6ac98d9c1b9fe52f029f044f
```

### `JWT_SECRET`

Course-project-only signing key used to create and verify authentication tokens.

Example:

```env
JWT_SECRET=cis3339_project_local_secret_2026_change_me
```

### `CORS_ORIGIN`

Frontend origin allowed to call the backend API.

For the Vite development server:

```env
CORS_ORIGIN=http://localhost:5173
```

For the Vite production preview:

```env
CORS_ORIGIN=http://localhost:5173
```

The production preview is configured to use port `5173`, so the same CORS origin is used for both development and production preview.

### `SEED_VIEWER_USERNAME`

Username created for the demo viewer account.

```env
SEED_VIEWER_USERNAME=user
```

### `SEED_VIEWER_PASSWORD`

Password used when initializing the demo viewer account.

```env
SEED_VIEWER_PASSWORD=user
```

### `SEED_EDITOR_USERNAME`

Username created for the demo editor account.

```env
SEED_EDITOR_USERNAME=admin
```

### `SEED_EDITOR_PASSWORD`

Password used when initializing the demo editor account.

```env
SEED_EDITOR_PASSWORD=admin
```

The database stores bcrypt password hashes rather than plaintext passwords.

---

## Frontend Environment Configuration

The frontend uses:

```text
frontend/.env
```

Example:

```env
VITE_ROOT_API=http://localhost:3000
```

`VITE_ROOT_API` contains the base URL of the backend REST API.

Frontend source files use this environment variable rather than hard-coded API URLs.

---

# Installation and Setup

## Backend Installation

From the project root:

```powershell
cd backend
npm install
```

---

## Database Initialization

The database can be initialized without manually creating MongoDB collections or users.

From the backend directory:

```powershell
npm run db:init
```

The initialization script creates the required application data when it does not already exist:

- configured organization
- viewer account
- editor account
- representative client records
- representative service records
- representative event records
- sample event registrations

The command is designed to be safe to run more than once.

Running:

```powershell
npm run db:init
npm run db:init
```

does not create duplicate organizations, users, or sample records.

The initialization process also preserves separately created application records rather than deleting the database contents.

---

## Demo Accounts

### Viewer

```text
Username: user
Password: user
Role: viewer
```

The viewer can access read-only application features.

### Editor

```text
Username: admin
Password: admin
Role: editor
```

The editor can perform create, update, delete, event registration, and deregistration operations.

---

## Start the Backend

From the backend directory:

```powershell
npm start
```

The backend runs at:

```text
http://localhost:3000
```

The backend uses nodemon during development and automatically restarts when backend source files change.

---

## Frontend Installation

Open another terminal and run:

```powershell
cd frontend
npm install
```

---

## Run the Frontend in Development

From the frontend directory:

```powershell
npm run dev
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

When using the development server, the backend should use:

```env
CORS_ORIGIN=http://localhost:5173
```

Restart the backend after changing `CORS_ORIGIN`.

---

# Production Frontend Build

From the frontend directory:

```powershell
npm run build
```

The generated production files are placed in:

```text
frontend/dist
```

The production build was verified to complete successfully without unresolved imports.

---

## Serve the Production Build Locally

From the frontend directory:

```powershell
npm run serve
```

This runs the Vite production preview server.

The production preview is configured to run at:

```text
http://localhost:5173
```

The frontend `package.json` uses:

```json
"serve": "vite preview --port 5173 --strictPort"
```

Because development and production preview both use port `5173`, only one frontend server can run at a time.

The backend remains configured with:

```env
CORS_ORIGIN=http://localhost:5173
```

No CORS change is required when switching between development mode and production preview.

The production build was verified for:

- successful login
- client list
- event list
- service list
- dashboard
- API communication
- nested Vue Router route refreshes

Refreshing a route such as:

```text
/clientdetails/:id
```

continues to load correctly when using the tested Vite preview setup.

---

# Authentication

The backend uses JSON Web Tokens.

After a successful login, the JWT contains:

```text
username
role
orgId
```

Protected backend routes use reusable middleware:

```text
requireAuth
requireRole('editor')
```

`requireAuth` returns HTTP `401` when a request does not contain a valid JWT.

`requireRole('editor')` returns HTTP `403` when a non-editor attempts an editor-only operation.

---

# Authorization Rules

Authenticated viewers may read:

- clients
- events
- services
- dashboard information

Editors may also:

- create records
- update records
- delete records
- register clients for events
- deregister clients from events

Backend authorization is enforced independently of frontend route protection.

A viewer attempting an editor-only API operation receives:

```json
{
  "error": "Forbidden"
}
```

with HTTP status:

```text
403
```

---

# Organization Isolation

Client, event, and service queries are restricted to the organization stored in:

```text
req.user.orgId
```

The backend does not trust organization ownership supplied by the browser.

A shared organization-scoping helper is used to ensure records from one organization cannot be accessed or modified by another organization's authenticated user.

---

# Event Registration Rules

Event registration requires the editor role.

Both the selected client and selected event must belong to the authenticated user's organization.

Registering a client who is already registered returns:

```json
{
  "message": "Already registered"
}
```

Deregistering a client who is not registered returns:

```json
{
  "message": "Not registered"
}
```

Both cases return HTTP status `200` and do not create invalid duplicate state.

---

# Error Handling

The backend uses centralized Express error handling.

API errors use the format:

```json
{
  "error": "Human readable message"
}
```

Raw MongoDB error objects, stack traces, and secrets are not returned to API clients.

---

# Health Check

The backend provides:

```text
GET /health
```

No authentication is required.

Example response:

```json
{
  "status": "ok",
  "db": "connected"
}
```

This endpoint can be used to confirm that the Express application is running and whether MongoDB is connected.

---

# Frontend Session Behavior

A valid JWT stored in the browser is restored when the application reloads.

The frontend restores:

- Axios authorization header
- Pinia login state
- username
- role

Expired or corrupted tokens are cleared.

Editor-only routes use Vue Router metadata and a global navigation guard to prevent viewer accounts from directly accessing editor pages.

Logging out clears both the stored token and frontend session state.

---

# Reusable Data Tables

Client, event, and service list pages share one reusable `DataTable` component.

The component supports:

- client-side sorting
- ascending sorting
- descending sorting
- return to unsorted state
- visible sort indicators
- 10 rows per page
- pagination controls
- empty result state
- row-click navigation

Representative seed data contains enough records to verify multiple pages.

---

# API Loading and Error States

Client, event, service, and dashboard views use a shared `useApi` composable to track:

- data
- loading
- errors
- execution
- retries

Axios response handling is centralized in the frontend API client.

Network failures are converted to a readable message rather than exposing raw Axios response objects.

---

# CORS

The backend does not allow every origin.

CORS is controlled by:

```env
CORS_ORIGIN=<frontend origin>
```

For development:

```env
CORS_ORIGIN=http://localhost:5173
```

For local production preview:

```env
CORS_ORIGIN=http://localhost:5173
```

Development and production preview use the same local origin. Only one frontend server should run at a time.

For a deployed application, replace the value with the deployed frontend origin.

The backend must be restarted after changing the `.env` configuration.

---

# SPA Routing and Deployment

The frontend is a Vue single-page application using Vue Router.

When deploying:

```text
frontend/dist
```

to a static host, the host must be configured with SPA history fallback.

Unknown frontend routes should be served through:

```text
index.html
```

Without this fallback, directly refreshing a nested route may return a server-level `404`.

The production build was locally verified using:

```powershell
npm run build
npm run serve
```

The deployed frontend must also use the correct:

```env
VITE_ROOT_API
```

value.

The backend must allow the deployed frontend origin through:

```env
CORS_ORIGIN
```

---

# Reproducing the Project From Scratch

The following process can be used by a new developer or grader to reproduce the project on a clean machine.

## Step 1 - Clone the Repository

Clone the repository:

```powershell
git clone <repository-url>
```

Move into the project directory:

```powershell
cd <repository-folder>
```

The project should contain:

```text
README.md
Project-README.md
backend/
frontend/
```

---

## Step 2 - Verify MongoDB

Make sure MongoDB is installed and running.

For a local MongoDB installation, the backend configuration may use:

```env
MONGO_URL=mongodb://127.0.0.1:27017/cis3339_project
```

If a remote MongoDB database is being used, replace this with the correct course-project connection string.

---

## Step 3 - Verify the Backend Environment File

Open:

```text
backend/.env
```

Verify that it contains the required settings:

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

For local development, leave:

```env
CORS_ORIGIN=http://localhost:5173
```

---

## Step 4 - Verify the Frontend Environment File

Open:

```text
frontend/.env
```

Verify that it contains:

```env
VITE_ROOT_API=http://localhost:3000
```

---

## Step 5 - Install Backend Dependencies

Open a terminal in the project directory.

Run:

```powershell
cd backend
npm install
```

Wait for npm to finish installing the backend packages.

---

## Step 6 - Initialize the Database

Make sure MongoDB is running.

From the backend directory run:

```powershell
npm run db:init
```

A successful initialization should create or verify:

- the configured organization
- viewer user
- editor user
- clients
- services
- events
- sample event registration data

The script should print a useful summary when it finishes.

---

## Step 7 - Verify Database Initialization Is Idempotent

Run the command again:

```powershell
npm run db:init
```

The second run should complete successfully without creating duplicate organizations, users, clients, services, or events.

The command should not delete unrelated existing application records.

---

## Step 8 - Start the Backend

From the backend directory:

```powershell
npm start
```

The backend should start on:

```text
http://localhost:3000
```

Leave this terminal running.

---

## Step 9 - Verify the Health Endpoint

Open Postman or a browser and request:

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

The health route does not require authentication.

---

## Step 10 - Install Frontend Dependencies

Open a second terminal.

From the project root run:

```powershell
cd frontend
npm install
```

Wait for npm to finish installing the frontend packages.

---

## Step 11 - Start the Frontend Development Server

Run:

```powershell
npm run dev
```

The development frontend should normally become available at:

```text
http://localhost:5173
```

Make sure the backend `.env` currently contains:

```env
CORS_ORIGIN=http://localhost:5173
```

If the value was changed, restart the backend.

---

## Step 12 - Verify the Viewer Account

Open the frontend and log in with:

```text
Username: user
Password: user
```

Confirm that the viewer can access:

- dashboard
- client list
- event list
- service list
- client details
- event details
- service information

The viewer should not be able to perform editor-only operations.

---

## Step 13 - Verify Viewer Authorization

A viewer should not be able to access editor-only routes directly.

If the viewer manually enters an editor-only frontend URL, the application should redirect the user.

Using Postman or another API client, an authenticated viewer attempting a backend mutation should receive:

```json
{
  "error": "Forbidden"
}
```

with HTTP status:

```text
403
```

---

## Step 14 - Verify the Editor Account

Log out from the viewer account.

Log in with:

```text
Username: admin
Password: admin
```

Confirm that the editor can access the editor-specific controls.

---

## Step 15 - Verify Client Workflows

As the editor, verify that the application can:

- display clients
- sort client columns
- paginate client results
- search for a client
- open client details
- create a client
- update a client
- delete a client

Confirm that the client table displays 10 rows per page when enough records exist.

---

## Step 16 - Verify Event Workflows

Confirm that the application can:

- display events
- sort event columns
- paginate event results
- search for an event
- open event details
- create events
- update events
- delete events

---

## Step 17 - Verify Service Workflows

Confirm that the application can:

- display services
- sort service columns
- paginate service results
- search for a service
- create services
- update services
- delete services

---

## Step 18 - Verify Event Registration

Using an editor account:

1. Select an existing client.
2. Select an existing event.
3. Register the client for the event.

The first valid registration should succeed.

Register the same client for the same event again.

Expected response:

```json
{
  "message": "Already registered"
}
```

The event should still contain only one registration for that client.

---

## Step 19 - Verify Event Deregistration

Deregister the client from the event.

The first valid deregistration should succeed.

Attempt to deregister the same client again.

Expected response:

```json
{
  "message": "Not registered"
}
```

The operation should not crash the backend.

---

## Step 20 - Verify Session Restoration

While logged in, refresh the browser.

The user should remain logged in as long as the JWT is still valid.

The application should restore:

- login state
- username
- role
- Axios authorization header

---

## Step 21 - Verify Logout

Click Logout.

Confirm that:

- the token is removed
- the Pinia session state is cleared
- protected routes are no longer accessible
- the user is returned to the login state

---

## Step 22 - Verify Loading and Error States

While viewing one of the list pages, stop the backend.

Refresh the page.

The frontend should display a readable error message instead of:

```text
[object Object]
```

or a blank screen.

The page should provide a retry option.

Restart the backend and use the retry button.

The page should recover and display the data again.

---

## Step 23 - Verify Empty State

Perform a search that returns no matching records.

The reusable table should display a clear:

```text
No results
```

state.

---

## Step 24 - Build the Production Frontend

Stop the Vite development server if it is still running.

From the frontend directory run:

```powershell
npm run build
```

The build should complete successfully and generate:

```text
frontend/dist
```

There should be no unresolved imports.

---

## Step 25 - Verify CORS for Production Preview

The production preview is configured to use:

```text
http://localhost:5173
```

Verify that:

```text
backend/.env
```

contains:

```env
CORS_ORIGIN=http://localhost:5173
```

No CORS change is required if the backend was already configured for the development frontend.

---

## Step 26 - Serve the Production Build

From the frontend directory run:

```powershell
npm run serve
```

The `serve` script uses:

```json
"serve": "vite preview --port 5173 --strictPort"
```

If port `5173` is already in use, stop the existing frontend process before running the preview.

Open:

```text
http://localhost:5173
```

This is the production build preview rather than the Vite development server.

---

## Step 27 - Verify Production Login

Log in using:

```text
admin / admin
```

or:

```text
user / user
```

Confirm that the frontend can communicate with the backend.

---

## Step 28 - Verify Production API Configuration

Confirm that:

```env
VITE_ROOT_API=http://localhost:3000
```

is being used by the production build.

The frontend source should not depend on a hard-coded:

```text
localhost:3000
```

API address.

---

## Step 29 - Verify Nested Route Refresh

Navigate to a client detail page.

The URL should look similar to:

```text
http://localhost:5173/clientdetails/<client-id>
```

Refresh the browser.

The client details page should reload normally rather than returning a server-level `404`.

---

## Step 30 - Verify the Main Production Workflows

While running the production build, verify:

- login
- logout
- dashboard
- client list
- client details
- event list
- event details
- service list
- sorting
- pagination
- editor controls
- session refresh
- API communication

The final course demo should use this production build rather than the Vite development server.

---

# Known Limitations

- The project currently uses one configured organization per application deployment.
- CORS accepts one configured frontend origin at a time.
- Development and production preview both use port `5173`, so only one frontend server should run at a time.
- Automated bonus tests are not currently included unless added separately.
- Deployment-specific SPA fallback configuration depends on the static hosting provider.
- Production deployment requires the correct deployed backend URL in `VITE_ROOT_API`.
- Production deployment requires the correct deployed frontend origin in `CORS_ORIGIN`.

---

# Useful Commands

## Backend

Install dependencies:

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

---

## Frontend Development

Install dependencies:

```powershell
cd frontend
npm install
```

Start development server:

```powershell
npm run dev
```

---

## Frontend Production

Build:

```powershell
cd frontend
npm run build
```

Serve production build:

```powershell
npm run serve
```

---

# AI Usage

AI tools were used as development assistance for tasks such as:

- explaining unfamiliar project code
- helping refactor Vue components
- reviewing API and security logic
- troubleshooting development issues
- checking implementation against project acceptance criteria
- assisting with documentation

AI-generated suggestions were reviewed and tested against the running application before being accepted.
