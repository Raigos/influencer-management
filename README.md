# Influencer Manager

A comprehensive system for managing influencers and their social media accounts. This project is structured as a
monorepo using pnpm workspaces, containing both the frontend client application and backend server, along with shared
packages.

## Project Structure

The repository is organized into the following main components:

### Applications (`apps/`)

- `client/`: React-based frontend application
- `server/`: Express.js backend server with Prisma ORM

### Packages (`packages/`)

- `database/`: Contains Prisma schema, migrations, and database configuration
- `shared/`: Common TypeScript types and validation logic used across applications

## Prerequisites

Before starting the project, ensure you have the following installed:

- Node.js (v16 or higher)
- pnpm (v7 or higher)
- PostgreSQL (v14 or higher)

## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd influencer-manager
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:

- Create a `.env` file in the server directory
- Add the following variables:
- password is your postgres password
  ```
  DATABASE_URL="postgresql://postgres:[password]@localhost:5432/influencer_db?schema=public"
  ```

4. Initialize the database:
   ```bash
   cd packages/database
   pnpm prisma migrate dev
   pnpm prisma generate
   ```

5. Seed the database with initial data:
   ```bash
   cd apps/server
   pnpm seed
   ```

## Running the Applications

You can start both applications simultaneously using the workspace scripts:

```bash
# Start both frontend and backend in development mode

pnpm --filter client dev    # Start frontend only
pnpm --filter server dev    # Start backend only
```

The applications will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:4000

## API Documentation

The backend server exposes the following main endpoints:

### Influencers

- `GET /api/influencers`: List all influencers
- `GET /api/influencers/:id`: Get a specific influencer
- `POST /api/influencers`: Create a new influencer
- `PATCH /api/influencers/:id`: Update an influencer
- `DELETE /api/influencers/:id`: Delete an influencer
- `PATCH /api/influencers/:id/manager`: Assign a manager to a influencer
- `DELETE /api/influencers/:id/manager`: Remove a manager from a influencer

### Employees

- `GET /api/employees`: List all employees

## Development Notes

- The server uses Prisma as the ORM for database operations
- The frontend and backend share common types through the `shared` package
- Both applications use TypeScript for type safety
