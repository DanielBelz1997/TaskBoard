import { useQuery } from "@tanstack/react-query";
import { getFilteredTasks } from "../api/task.js";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getFilteredTasks,
  });
}
