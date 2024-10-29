import React from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

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

  const [searchTerm, setSearchTerm] = React.useState("");

  const addTaskMutation = useAddTask();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
      <div style={{ display: "flex" }}>
        <Button
          onClick={handleCreateOpen}
          variant="contained"
          color="inherit"
          endIcon={<SendIcon />}
          size="large"
          sx={{}}>
          New Task
        </Button>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search Task…"
            inputProps={{ "aria-label": "search" }}
            value={searchTerm}
            onChange={handleSearchChange} // Update search term on input change
          />
        </Search>
      </div>
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
      <DataTable searchTerm={searchTerm} />
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


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: 20,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));