# TaskBoard

TaskBoard is a task management application built with React, Redux, Material-UI, and React Query. It provides an efficient and user-friendly interface for organizing and managing tasks with essential features like server-side pagination, sorting, and search capabilities.

## Features

- **Task Management**: Add, view, update, and delete tasks seamlessly.
- **Server-Side Pagination**: Efficient pagination implemented using React Query for handling large datasets.
- **Sorting & Search**: Sort tasks by various fields and perform real-time search queries.
- **Material-UI DataGrid**: Customized DataGrid with font styling, column visibility control, and loading indicators.
- **Redux Integration**: Centralized state management for consistent user experience.

## Tech Stack

- **Frontend**: React, Material-UI
- **State Management**: Redux, React Query v5
- **Backend**: Node.js and Express API (for task handling)
- **Database**: MongoDB (for storing task data)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/DanielBelz1997/TaskBoard.git
   cd TaskBoard
   ```

2. **Install Dependencies On The Client**

   ```bash
   cd client
   npm install
   ```

3. **Set Up Environment Variables On The Client**  
   Create a `.env` file in the root directory with the following (update variables as needed):

   ```plaintext
   REACT_APP_API_URL=http://localhost:3000/api
   ```

4. **Run the Application**

   ```bash
   cd server
   npm start
   ```

   The application will run on `http://localhost:3000`.

5. **Run the Backend Server**  
   If you're using a local Express server for the backend, navigate to the server directory and start the server:

   ```bash
   cd server
   npm start
   ```

6. **Set Up Environment Variables On The Server**  
   Create a `.env` file in the root directory with the following (update variables as needed):

   ```plaintext
   PORT=3000
   MONGO_URI=your_connection_string
   ```

## Usage

- **View Tasks**: See the list of tasks in the DataGrid with pagination and search functionality.
- **Manage Tasks**: Add, edit, or delete tasks directly from the UI.
- **Customize View**: Use DataGrid settings to sort tasks, toggle column visibility, and adjust font style.
- **Loading Indicator**: Displays a loading overlay specific to the DataGrid area during data fetches, enhancing UX.

## API Endpoints

Assuming an Express-based backend API with MongoDB, the following endpoints are available for handling tasks:

GET /api/tasks - Fetches a paginated list of tasks with options for search and sorting.
GET /api/tasks/:id - Fetches a specific task base on the id provided in the url params.
POST /api/tasks - Creates a new task.
PUT /api/tasks/:id - Updates an existing task by ID.
DELETE /api/tasks/:id - Deletes a task by ID.
Refer to the backend code in the /server directory for details on data models and route definitions.

## GET Tasks API Endpoints Summary

### 1. Pagination

- **Endpoint**: `GET /api/tasks`
- **Functionality**: Retrieve a list of tasks with support for pagination.
- **Parameters**:
  - `page` (optional): The page number to retrieve. Defaults to 1.
  - `limit` (optional): The number of tasks per page. Defaults to 10.
- **Response**: Returns a paginated list of tasks along with metadata, including:
  - Total number of tasks
  - Total pages
  - Current page
  - Tasks per page

### 2. Filtering

- **Endpoint**: `GET /api/tasks`
- **Functionality**: Allow filtering of tasks based on specific criteria.
- **Parameters**:
  - `priority` (optional): Filter tasks by priority level (e.g., high, medium, low).
  - `title` (optional): Search tasks by title keyword.
  - Additional filters as needed.
- **Response**: Returns a list of tasks that match the filter criteria.

### 3. Sorting

- **Endpoint**: `GET /api/tasks`
- **Functionality**: Allow sorting of tasks based on specified fields.
- **Parameters**:
  - `sortBy` (optional): The field to sort by (e.g., createdAt, priority).
  - `order` (optional): The order of sorting (asc for ascending, desc for descending). Defaults to `asc`.
- **Response**: Returns the sorted list of tasks based on the specified parameters.

## State Management

TaskBoard uses a combination of Redux and React Query to manage application state:

Redux: Manages local/global UI states and settings (e.g., theme preferences, DataGrid column visibility).
React Query: Handles asynchronous data fetching for tasks, ensuring efficient data management with built-in caching, refetching, and synchronization capabilities.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes.
4. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact Info

If you want to contact me about the project, please feel free to contact me on email: belzdaniel6@gmail.com

---

Feel free to customize or expand the project based on your needs!
