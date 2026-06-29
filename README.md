# FitShare — Frontend

Social fitness platform for sharing and discovering workout routines. Built with Angular 19.

## Features

- **Feed** — browse workout routines shared by other users
- **Comments** — engage with posts and leave feedback
- **Statistics** — track activity and progress
- **News** — latest updates from the community
- **Auth** — register and login with credential-based authentication

## Tech Stack

- [Angular 19](https://angular.dev) + TypeScript
- Tailwind CSS
- Connected to a Spring Boot REST API backend

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

> **Note:** You need the [FitShare backend](https://github.com/elmano777/) running locally or update the API URL in the environment config.

## Project Structure

```
src/app/
├── auth/          # Login & register pages
├── home/          # Main feed, comments, statistics, news
└── app.routes.ts  # Route definitions
```

## Related

- [FitShare Backend](https://github.com/elmano777/) — Spring Boot REST API
