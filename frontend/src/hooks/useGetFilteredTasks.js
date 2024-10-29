import { useQuery } from "@tanstack/react-query";
import { getFilteredTasks } from "../api/task.js";

export function useTasks(page, limit, sortBy) {
  return useQuery({
    queryKey: ["tasks", page, limit, sortBy],
    queryFn: () => getFilteredTasks(page, limit, sortBy),
    keepPreviousData: true,
  });
}

