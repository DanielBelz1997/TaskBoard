import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/task";

export const useUpdateTask = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task) => updateTask({ id, task }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      if (id) {
        queryClient.invalidateQueries({ queryKey: ["tasks", id] });
      }
      // toast.success("updated!");
    },
    onError(res) {
      console.error(res);
      // toast.error("action failed. please try again");
    },
  });
};
