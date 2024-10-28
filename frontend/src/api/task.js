import axios from "axios";

export const getFilteredTasks = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
  return response.data.tasks;
};

export const getTask = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/tasks/${id}`
  );
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/tasks`,
    task
  );
  return response.data;
};

export const updateTask = async ({ id, task }) => {
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/tasks/${id}`,
    task
  );

  return response.data;
};
