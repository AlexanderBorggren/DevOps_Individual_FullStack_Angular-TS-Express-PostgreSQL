# Todo Task Web Application

This is a full-stack Todo task web application built with PostgreSQL, Express, Angular (TypeScript), and Node.js. 
It also allows users to manage tasks with full CRUD (Create, Read, Update, Delete) functionality.

## Setup

### 1. Install and Configure PostgreSQL

- Install PostgreSQL on your enviornment.
- Ensure PostgreSQL is running and accessible.

### 2. Configure the Backend

- Setup your environment with following settings for your database:
DB_HOST=<your_database_host>
DB_PORT=5432
DB_USERNAME=<your_database_username>
DB_PASSWORD=<your_database_password>
DB_DATABASE=<your_database_name>

- Update the database connection settings to match your PostgreSQL setup.
- Environment file for server can be found under /server/.env
- Toggle the toggleDevDotEnv const on inside /server/database.ts if using the .env file,
  else toggle off and configure in production environment.

### 3. Configure the Server Port

- Open `./server/server.ts`.
- Set your preferred port (default is `3000`).

### 4. Configure the Frontend
- Open /Environments/ folder and adjust the server-URL to match the server, depending on development or production environment.

## Running the Application in Development

### 1. Start the PostgreSQL Database

- Ensure PostgreSQL is online.
- The database configuration is handled automatically by TypeORM.

### 2. Start the Backend Server

In your terminal, navigate to the server directory and run:

    cd server
    npm run serve

### 3. Start the Angular Application

In a new terminal window, navigate to the Angular application directory and run:

    cd app
    ng serve

## Usage

### 1. Access the Application

- Open your browser and go to [http://localhost:4200](http://localhost:4200) (default Angular port).

### 2. Manage Tasks

- Use the web interface to add, view, and manage tasks.

### 3. API Endpoints

- Interact with the API at [http://localhost:3000/todos](http://localhost:3000/todos) for CRUD operations.
