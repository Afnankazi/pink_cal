# Todo API (Node.js Express)

This project provides a complete Node.js (Express) API for managing a todo list. It supports standard CRUD (Create, Read, Update, Delete) operations for todos, stores data in memory, and follows a clean, well-structured architecture.

## Features

*   **CRUD Operations**: Create, Read (all/by ID), Update, Delete todos.
*   **In-Memory Storage**: Data is stored in a simple array, perfect for demonstration or lightweight use cases.
*   **Express Router**: Proper use of `express.Router()` for modular route definitions.
*   **Clean Architecture**: Separate folders for `models`, `controllers`, `routes`, and `middleware`.
*   **Input Validation**: Request body validation using `Joi` to ensure data integrity.
*   **Error Handling**: Global error handling middleware for consistent error responses.
*   **HTTP Status Codes**: Returns appropriate HTTP status codes for all operations.
*   **Unique IDs**: Uses `uuid` for generating unique identifiers for todos.
*   **Timestamps**: `createdAt` field for each todo.

## Project Structure

```
todo-api/
├── src/
│   ├── controllers/         # Business logic for handling requests
│   │   └── todo.controller.js
│   ├── middleware/          # Custom Express middleware (validation, error handling)
│   │   ├── error.middleware.js
│   │   └── validation.middleware.js
│   ├── models/              # Data structure and in-memory storage logic
│   │   └── todo.model.js
│   ├── routes/              # API route definitions
│   │   └── todo.routes.js
│   ├── app.js               # Express application setup and middleware configuration
│   └── server.js            # Entry point to start the server
├── .gitignore               # Files/folders to ignore in Git
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: [LTS version recommended](https://nodejs.org/en/download/)
*   **npm**: Comes bundled with Node.js

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/todo-api.git
    cd todo-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Setup Commands

No specific setup commands are needed beyond `npm install`.

## How to Run the Project

There are two ways to run the project:

1.  **Development Mode (with Nodemon):**
    This mode uses `nodemon` to automatically restart the server when file changes are detected.
    ```bash
    npm run dev
    ```

2.  **Production Mode (Node.js):**
    This mode runs the server directly with Node.js.
    ```bash
    npm start
    ```

The API will be running at `http://localhost:3000` (or your specified `PORT`).

## API Endpoints

All endpoints are prefixed with `/api/todos`.

| Method | Endpoint         | Description                                     | Request Body                                     | Response Status | Response Body (Success)                               | Response Body (Error)                           |
| :----- | :--------------- | :---------------------------------------------- | :----------------------------------------------- | :-------------- | :---------------------------------------------------- | :---------------------------------------------- |
| `GET`  | `/api/todos`     | Get all todo items                              | None                                             | `200 OK`        | `Array<Todo>`                                         | `500 Internal Server Error`                     |
| `GET`  | `/api/todos/:id` | Get a single todo item by ID                    | None                                             | `200 OK`        | `Todo`                                                | `404 Not Found`, `500 Internal Server Error`    |
| `POST` | `/api/todos`     | Create a new todo item                          | `{"title": "string", "description": "string"}` | `201 Created`   | `Todo`                                                | `400 Bad Request`, `500 Internal Server Error`  |
| `PUT`  | `/api/todos/:id` | Update an existing todo item by ID              | `{"title"?: "string", "description"?: "string", "isCompleted"?: "boolean"}` | `200 OK`        | `Todo`                                                | `400 Bad Request`, `404 Not Found`, `500 Internal Server Error` |
| `DELETE`| `/api/todos/:id` | Delete a todo item by ID                        | None                                             | `204 No Content`| None                                                  | `404 Not Found`, `500 Internal Server Error`    |

### `Todo` Object Structure

```json
{
  "id": "string",         // Unique identifier (UUID)
  "title": "string",      // The title of the todo
  "description": "string",// A detailed description of the todo
  "isCompleted": "boolean", // Completion status (default: false)
  "createdAt": "string"   // ISO 8601 timestamp of creation
}
```

## Example Requests (using `curl`)

Assuming the server is running on `http://localhost:3000`.

### 1. Create a Todo (POST)

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Express", "description": "Dive deep into Express.js routing and middleware."}' \
  http://localhost:3000/api/todos
```

_Example Response (201 Created):_

```json
{
  "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "title": "Learn Express",
  "description": "Dive deep into Express.js routing and middleware.",
  "isCompleted": false,
  "createdAt": "2023-11-20T10:00:00.000Z"
}
```

### 2. Get All Todos (GET)

```bash
curl http://localhost:3000/api/todos
```

_Example Response (200 OK):_

```json
[
  {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "title": "Learn Express",
    "description": "Dive deep into Express.js routing and middleware.",
    "isCompleted": false,
    "createdAt": "2023-11-20T10:00:00.000Z"
  }
]
```

### 3. Get Todo by ID (GET)

Replace `YOUR_TODO_ID` with an actual ID from a created todo.

```bash
curl http://localhost:3000/api/todos/YOUR_TODO_ID
```

### 4. Update a Todo (PUT)

Replace `YOUR_TODO_ID` with an actual ID.

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{"isCompleted": true, "title": "Mastered Express!"}' \
  http://localhost:3000/api/todos/YOUR_TODO_ID
```

### 5. Delete a Todo (DELETE)

Replace `YOUR_TODO_ID` with an actual ID.

```bash
curl -X DELETE \
  http://localhost:3000/api/todos/YOUR_TODO_ID
```

_Example Response (204 No Content) - no body returned._

## How to Run Tests

This project does not include automated tests as per the requirements.

## Environment Variables Needed

| Name | Description                               | Example |
| :--- | :---------------------------------------- | :------ |
| `PORT` | The port on which the API server will run | `3000`  |

If `PORT` is not specified, the server will default to port `3000`.
