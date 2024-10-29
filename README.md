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

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory with the following (update variables as needed):

   ```plaintext
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Run the Application**

   ```bash
   npm start
   ```

   The application will run on `http://localhost:3000`.

5. **Run the Backend Server**  
   If you're using a local Express server for the backend, navigate to the server directory and start the server:
   ```bash
   cd server
   npm start
   ```

## Usage

- **View Tasks**: See the list of tasks in the DataGrid with pagination and search functionality.
- **Manage Tasks**: Add, edit, or delete tasks directly from the UI.
- **Customize View**: Use DataGrid settings to sort tasks, toggle column visibility, and adjust font style.
- **Loading Indicator**: Displays a loading overlay specific to the DataGrid area during data fetches, enhancing UX.

## Project Structure

```plaintext
TaskBoard/
├── src/
│   ├── components/       # Reusable components
│   ├── redux/            # Redux slices and store configuration
│   ├── hooks/            # Custom React Query hooks for task data
│   ├── pages/            # Main pages (TaskBoard, etc.)
│   └── utils/            # Utility functions
├── public/
├── server/               # Express server (optional)
├── .env
├── package.json
└── README.md
```

## API Endpoints

Assuming an Express-based backend API with MongoDB, the following endpoints are available for handling tasks:

GET /api/tasks - Fetches a paginated list of tasks with options for search and sorting.
POST /api/tasks - Creates a new task.
PUT /api/tasks/:id - Updates an existing task by ID.
DELETE /api/tasks/:id - Deletes a task by ID.
Refer to the backend code in the /server directory for details on data models and route definitions.

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

---

Feel free to customize or expand the project based on your needs!
