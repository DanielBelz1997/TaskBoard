import { useQuery } from "@tanstack/react-query";
import { getTask } from "../api/task.js";

export function useGetTaskById(id) {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTask(id),
    enabled: !!id,
  });
}
