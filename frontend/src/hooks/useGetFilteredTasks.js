import { useQuery } from "@tanstack/react-query";
import { getFilteredTasks } from "../api/task.js";

export function useTasks(page, limit) {
  return useQuery({
    queryKey: ["tasks", page, limit],
    queryFn: getFilteredTasks,
  });
}

