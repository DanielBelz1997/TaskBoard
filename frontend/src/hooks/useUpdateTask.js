import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../../api/tasks";
import { toast } from "react-toastify";

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("updated!");
    },
    onError(res) {
      console.error(res);
      toast.error("action failed. please try again");
    },
  });
};
