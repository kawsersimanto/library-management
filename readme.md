# Library Management System

A library management system.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Mongoose
- dotenv
- Database: MongoDB

## How to get started

1. Clone the repository

```bash
git clone https://github.com/kawsersimanto/library-management.git
```

2. Navigate to the project directory

```bash
cd library-management
```

3. Install dependencies

```bash
npm install
```

4. Create a .env file in the root directory and add the following variables

```bash
PORT=5000
MONGO_URI=your_mongodb_uri
```

5. Run the server

```bash
npm run dev
```

## API Endpoints

### Book Endpoints

- GET /api/books
- GET /api/books/:id
- POST /api/books
- PUT /api/books/:id
- DELETE /api/books/:id

### Borrow Book Endpoints

- POST /api/borrow
- GET /api/borrow
