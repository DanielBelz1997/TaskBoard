import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";

import { Form } from "../components/Form.jsx";
import { useAddTask } from "../hooks/useCreateTask.js";
import { DataTable } from "../components/TasksTable/DataTable";
import { DialogComponent } from "../components/DialogComponent.jsx";
import { openSnackBar, closeSnackBar } from "../redux/snackBarSlice.js";
import { openDialog, closeDialog } from "../redux/createDialogSlice.js";

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
          dispatch(closeDialog());
          dispatch(openSnackBar());
          reset();
        },
      }
    );
  };

  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.createDialog);
  const { open: snackBarOpen } = useSelector((state) => state.snackBar);

  const handleCreateOpen = () => {
    dispatch(openDialog());
  };

  const handleCreateClose = () => {
    dispatch(closeDialog());
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeSnackBar());
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleSnackBarClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackBarClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

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
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        message="Task Created!"
        action={action}
      />
    </>
  );
};

