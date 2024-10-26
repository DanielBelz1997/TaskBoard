import axios from "axios";

export const getFilteredTasks = async (param) => {
  const response = await axios.get(import.meta.env.VITE_API_URL, {
    params: param ? { param } : {},
  });
  return response.data;
};

export const getTask = async (id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/tasks/${id}`
  );
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(import.meta.env.VITE_API_URL, task);
  return response.data;
};

export const updateTask = async ({ id, task }) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/${id}`,
    task
  );

  return response.data;
};
