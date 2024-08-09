# Project Setup Guide

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- PostgreSQL
- npm

## Environment Variables

Create a `.env` file in the `backend` directory and add the following:

```
SERVER_PORT=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=

JWT_SECRET=
```

## Database Setup

1. **Create the Database:**

   Use the `db.sql` in the backend folder to create the necessary database and tables.

2. **Configure Database Connection:**

   Make sure the environment variables in your `.env` file match your PostgreSQL configuration.

## Installation

1. **Backend Setup:**

   Navigate to the `backend` directory:

   Install the dependencies:

   \`\`\`bash
   npm install
   \`\`\`

2. **Frontend Setup:**

   Navigate to the `frontend` directory:

   Install the dependencies:

   ```bash
   npm install
   ```

## Running the Project

1. **Start the Backend:**

   In the `backend` directory, start the server:

   ```bash
   npm start
   ```

2. **Start the Frontend:**

   In the `frontend` directory, start the development server:

   ```bash
   npm run dev
   ```
