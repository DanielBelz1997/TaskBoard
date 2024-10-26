import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../api/tasks";
import { toast } from "react-toastify";

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("task created!");
    },
    onError(res) {
      toast.error("action failed. please try again later");
      console.log(res);
    },
  });
};