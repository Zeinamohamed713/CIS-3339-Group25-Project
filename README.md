# Data Platform Backend

## Overview

This folder contains the Node.js and Express backend for the CIS 3339 Data Platform project.

The backend uses:

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- CORS
- Morgan

The backend provides REST API routes for authentication, clients, events, services, organization information, and event registration/deregistration.

Authentication, role authorization, and organization isolation are enforced on the server.

---

## Requirements

Before running the backend, install:

- Node.js
- npm
- MongoDB

MongoDB may be installed locally or hosted remotely.

---

## Installation

Open a terminal in the backend directory:

```powershell
cd backend
npm install
```

---

## Environment Configuration

The backend uses `backend/.env`.

Example:

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

### Environment Variables

- `PORT` — port used by Express.
- `MONGO_URL` — MongoDB connection string.
- `ORG_ID` — organization configured for this deployment.
- `JWT_SECRET` — signing key used to create and verify JWTs.
- `CORS_ORIGIN` — frontend origin allowed to call the backend.
- `SEED_VIEWER_USERNAME` / `SEED_VIEWER_PASSWORD` — demo viewer credentials.
- `SEED_EDITOR_USERNAME` / `SEED_EDITOR_PASSWORD` — demo editor credentials.

For Vite development:

```env
CORS_ORIGIN=http://localhost:5173
```

For the production preview:

```env
CORS_ORIGIN=http://localhost:5173
```

The frontend production preview is configured with:

```json
"serve": "vite preview --port 5173 --strictPort"
```

Development and production preview therefore use the same local frontend origin. Only one frontend server should run at a time.

Restart the backend only when `.env` values actually change.

Passwords are hashed with bcrypt before being stored in MongoDB.

---

## Database Initialization

Manual MongoDB collection creation is not required.

Make sure MongoDB is running, then execute:

```powershell
npm run db:init
```

The initialization script creates or verifies:

- the configured organization
- viewer account
- editor account
- representative clients
- representative services
- representative events
- sample event registrations

The command is designed to be safe to run multiple times.

```powershell
npm run db:init
npm run db:init
```

Running it again should not create duplicate organizations, demo users, clients, services, or events, and it should not delete unrelated application records.

---

## Demo Accounts

### Viewer

```text
Username: user
Password: user
Role: viewer
```

The viewer can perform authenticated read operations.

### Editor

```text
Username: admin
Password: admin
Role: editor
```

The editor can perform read and mutation operations.

---

## Starting the Backend

From the backend directory:

```powershell
npm start
```

The backend normally runs at:

```text
http://localhost:3000
```

The development start command uses nodemon, so the backend automatically restarts when backend source files change.

---

## Health Check

The backend provides a public health endpoint:

```http
GET /health
```

Example URL:

```text
http://localhost:3000/health
```

Example response:

```json
{
  "status": "ok",
  "db": "connected"
}
```

Authentication is not required for this endpoint.

---

## Authentication

The application uses JWT authentication.

After a successful login, the token contains:

```text
username
role
orgId
```

Protected routes use reusable middleware:

```js
requireAuth
```

Requests without a valid JWT receive HTTP `401`.

---

## Role Authorization

Mutation routes require the editor role:

```js
requireRole('editor')
```

A logged-in viewer who attempts an editor-only operation receives:

```json
{
  "error": "Forbidden"
}
```

with HTTP status `403`.

---

## Route Permissions

Authenticated users may read:

- clients
- events
- services

Editors may additionally:

- create
- update
- delete
- register clients for events
- deregister clients from events

These permissions are enforced by the backend and do not depend only on frontend controls.

---

## Organization Isolation

Client, event, and service queries are scoped using the organization contained in the authenticated JWT:

```js
req.user.orgId
```

A shared helper applies the organization filter to database queries. The backend does not trust an organization ID supplied by the browser when deciding which organization's data may be accessed.

---

## Login Security

Failed logins return the same message regardless of whether the username or password was incorrect:

```json
{
  "error": "Invalid username or password"
}
```

---

## Event Registration

Event registration and deregistration require:

```text
requireAuth
requireRole('editor')
```

Both the selected client and event must exist within the authenticated user's organization.

### Duplicate Registration

Attempting to register the same client for the same event twice returns:

```json
{
  "message": "Already registered"
}
```

with HTTP status `200` and does not create a duplicate attendee.

### Deregistering a Missing Registration

Attempting to deregister a client who is not currently registered returns:

```json
{
  "message": "Not registered"
}
```

with HTTP status `200`.

---

## Error Handling

The backend uses centralized Express error handling.

API errors use a consistent JSON structure:

```json
{
  "error": "Human readable message"
}
```

Expected status codes include:

```text
400 - Invalid request or validation error
401 - Authentication required or invalid token
403 - Insufficient permissions
404 - Resource not found
500 - Unexpected server error
```

Stack traces, secrets, and raw MongoDB error objects should not be included in client responses.

---

## CORS

The backend restricts browser requests using `CORS_ORIGIN`.

For frontend development:

```env
CORS_ORIGIN=http://localhost:5173
```

For the production preview:

```env
CORS_ORIGIN=http://localhost:5173
```

The frontend development server and production preview both use port `5173`, so no CORS change is needed between those two local modes.

If the frontend origin changes for deployment, update the setting and restart the backend.

---

## Development Workflow

A normal local backend setup is:

```powershell
cd backend
npm install
npm run db:init
npm start
```

The backend will then be available at:

```text
http://localhost:3000
```

---

## Verifying the Backend

After starting the server, verify the following.

### Health

```text
GET /health
```

Expected:

```json
{
  "status": "ok",
  "db": "connected"
}
```

### Viewer Login

```text
user / user
```

Confirm the viewer can perform authenticated reads.

### Editor Login

```text
admin / admin
```

Confirm the editor can perform mutation operations.

### Authorization

Using the viewer token, attempt a mutation request. Expected result: HTTP `403`.

### Event Registration

Verify:

```text
first registration -> success
second registration -> "Already registered"
first deregistration -> success
second deregistration -> "Not registered"
```

---

## Production Frontend Compatibility

The frontend API location is configured through `VITE_ROOT_API` in `frontend/.env`.

For local testing:

```env
VITE_ROOT_API=http://localhost:3000
```

The backend's `CORS_ORIGIN` must match the actual frontend origin.

When the frontend is served with:

```powershell
npm run serve
```

the production preview is configured to use:

```text
http://localhost:5173
```

with:

```json
"serve": "vite preview --port 5173 --strictPort"
```

Keep:

```env
CORS_ORIGIN=http://localhost:5173
```

If port `5173` is already in use, stop the existing frontend process before starting the production preview.

---

## Useful Commands

Install backend dependencies:

```powershell
npm install
```

Initialize the database:

```powershell
npm run db:init
```

Start the backend:

```powershell
npm start
```

---

## Notes

- MongoDB collections do not need to be manually created before running the project.
- Demo users do not need to be manually inserted.
- Password hashes do not need to be manually generated.
- Use `npm run db:init` to prepare the required database records.
- Running the normal initialization command should not erase unrelated application data.
- The `.env` credentials committed for grading must only be used for this course project.

