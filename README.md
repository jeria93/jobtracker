# Job Application Tracker

A fullstack job application tracker built with React Native, Expo, TypeScript,
Node.js, Express, and SQLite.

The app helps users track job applications from saved roles to offers and
rejections.

## Features

- View all job applications
- Filter applications by status
- View application details
- Create a new application
- Update application status
- Delete an application
- Store data locally with SQLite
- Seed the database with example applications

## Tech Stack

### Frontend

- React Native
- Expo
- TypeScript

### Backend

- Node.js
- Express
- TypeScript
- SQLite
- better-sqlite3

## Project Structure

```text
jobtracker/
├── backend/
│   └── src/
│       ├── app.ts
│       ├── database.ts
│       ├── server.ts
│       ├── seedData.ts
│       └── features/
│           └── applications/
│               ├── applicationRepository.ts
│               ├── applicationRoutes.ts
│               ├── applicationService.ts
│               └── applicationTypes.ts
├── frontend/
│   ├── App.tsx
│   └── src/
│       ├── api/
│       ├── components/
│       ├── constants/
│       └── types/
└── README.md
```

## Requirements

- Node.js 22
- npm
- Expo Go or an iOS or Android simulator

If you use `fnm`, run this from the project root:

```bash
fnm use
```

## Setup

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

## Run the App

Start the backend first:

```bash
cd backend
npm run dev
```

The API runs on:

```text
http://localhost:3000
```

Start the frontend in another terminal:

```bash
cd frontend
npm run ios
```

You can also use:

```bash
npm run android
npm run web
npm run start
```

## Typecheck

Backend:

```bash
cd backend
npm run typecheck
```

Frontend:

```bash
cd frontend
npx tsc --noEmit
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

## Example Requests

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

SQLite data is created automatically when the backend starts.

Database files are stored locally in:

```text
backend/data/jobtracker.sqlite
```

Local database files are ignored by git.

## Notes

The backend stores SQLite fields in `snake_case` and maps them to `camelCase`
before sending data to the frontend.
