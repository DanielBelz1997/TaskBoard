import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/task";

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError(res) {
      console.log(res);
    },
  });
};
