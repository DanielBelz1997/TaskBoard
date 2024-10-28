import { useQuery } from "@tanstack/react-query";
import { getFilteredTasks } from "../api/task.js"; // Adjust the path as necessary

export function useTasks(page, pageSize) {
  return useQuery({
    queryKey: ["tasks", page, pageSize],
    queryFn: () => getFilteredTasks({ page, limit: pageSize }),
    keepPreviousData: true,
  });
}
