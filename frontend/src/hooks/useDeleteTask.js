import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/task";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteTask(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError(res) {
      console.log(res);
    },
  });
};

