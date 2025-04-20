# English Learning Application Backend

Backend API for English Learning Application built with NestJS.

## Features

- Vocabulary Management
- Lesson Management
- User Management
- Learning Progress Tracking
- Gamification System
- Statistics and Analytics
- Notifications
- Internationalization

## Prerequisites

- Node.js (v16 or later)
- MongoDB
- Redis (optional, for caching)
- Cloudinary account (for media storage)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/brainy_nestjs.git
cd brainy_nestjs
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update environment variables in `.env` file with your configuration.

## Running the app

```bash
# development
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## API Documentation

After starting the application, you can access the API documentation at:
```
http://localhost:3000/api
```

## Project Structure

```
src/
├── core/                    # Core business logic
│   ├── domain/             # Enterprise business rules
│   ├── application/        # Application business rules
│   └── infrastructure/     # Frameworks & drivers
│
├── modules/                # Feature modules
│   ├── auth/              # Authentication module
│   ├── users/             # User management module
│   ├── flashcards/        # Flashcard module
│   ├── lessons/           # Lesson module
│   ├── progress/          # Progress tracking module
│   ├── scoring/           # Scoring system module
│   ├── statistics/        # Statistics module
│   ├── notifications/     # Notification module
│   └── i18n/              # Internationalization module
│
└── shared/                # Shared utilities
```

## License

This project is licensed under the MIT License. 