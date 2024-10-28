import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";

import { Form } from "../components/Form.jsx";
import { DataTable } from "../components/TasksTable/DataTable";
import { useAddTask } from "../hooks/useCreateTask.js";
import { openDialog, closeDialog } from "../redux/createDialogSlice.js";
import { DialogComponent } from "../components/DialogComponent.jsx";

export const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addTaskMutation = useAddTask();

  const handleAddTask = (values) => {
    addTaskMutation.mutate(
      {
        title: values.title,
        description: values.description,
      },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.createDialog);

  const handleCreateOpen = () => {
    dispatch(openDialog());
  };

  const handleCreateClose = () => {
    dispatch(closeDialog());
  };

  return (
    <>
      <Button
        onClick={handleCreateOpen}
        variant="contained"
        color="inherit"
        endIcon={<SendIcon />}
        size="large"
        sx={{}}>
        New Task
      </Button>
      <DialogComponent
        open={open}
        setOpen={handleCreateOpen}
        setClose={handleCreateClose}
        title="Create Task"
        acceptFun={handleSubmit(handleAddTask)}
        acceptText="Create"
        acceptIcon={<SendIcon />}>
        <Form register={register} errors={errors} />
      </DialogComponent>
      <DataTable />
    </>
  );
};

