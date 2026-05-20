# Job Application Tracker

A React Native and Node.js application for tracking job applications.

## Tech Stack

- React Native
- Expo
- TypeScript
- Node.js
- Express
- SQLite

## Project Structure

```text
backend/
frontend/
```

## Backend

The backend is an Express API written in TypeScript. It uses SQLite for local
storage and creates the database automatically when the server starts.

### Requirements

- Node.js 22
- npm

If you use `fnm`, run this from the project root:

```bash
fnm use
```

### Run the Backend

```bash
cd backend
npm install
npm run dev
```

The API runs on:

```text
http://localhost:3000
```

### Typecheck

```bash
cd backend
npm run typecheck
```

## API Endpoints

```text
GET    /health
GET    /applications
GET    /applications/:id
POST   /applications
PATCH  /applications/:id/status
DELETE /applications/:id
```

### Example Requests

Create a job application:

```bash
curl -i -X POST http://localhost:3000/applications \
  -H "Content-Type: application/json" \
  -d '{"companyName":"IKEA","jobTitle":"Frontend Developer","status":"saved"}'
```

Update application status:

```bash
curl -i -X PATCH http://localhost:3000/applications/1/status \
  -H "Content-Type: application/json" \
  -d '{"status":"interview"}'
```

Delete a job application:

```bash
curl -i -X DELETE http://localhost:3000/applications/1
```

## Local Database

SQLite data is created locally in:

```text
backend/data/jobtracker.sqlite
```

The local database files are ignored by git.
