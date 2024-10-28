import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import { DialogComponent } from "./DialogComponent.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "../components/Form.jsx";
import { useForm } from "react-hook-form";
import {
  openUpdateDialog,
  closeUpdateDialog,
} from "../redux/updateDialogSlice.js";
import { openInfoDialog, closeInfoDialog } from "../redux/infoDialogSlice.js";
import { useEffect } from "react";
import { setRows, setRow, updateRow } from "../redux/apiSlice.js";
import { useTasks } from "../hooks/useGetFilteredTasks";
import { Loader } from "./Loader/index.jsx";
import InfoIcon from "@mui/icons-material/Info";
import { useGetTaskById } from "../hooks/useGetTaskById.js";
import { useUpdateTask } from "../hooks/useUpdateTask.js";

const paginationModel = { page: 0, pageSize: 10 };

export function DataTable() {
  const dispatch = useDispatch();
  const { data: tasks, isLoading, error } = useTasks();
  const { open: editOpen, selectedUpdateRowId } = useSelector(
    (state) => state.updateDialog
  );
  const { open: infoOpen, selectedRowId } = useSelector(
    (state) => state.infoDialog
  );

  const { data: taskDetails } = useGetTaskById(
    selectedRowId ? selectedRowId : null
  );

  const { data: updateTaskDetails } = useGetTaskById(
    selectedUpdateRowId?._id ? selectedUpdateRowId?._id : null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const updateTaskMutation = useUpdateTask(selectedUpdateRowId?._id);

  const handleUpdateTask = (values) => {
    updateTaskMutation.mutate(
      {
        title: values.title,
        description: values.description,
      },
      {
        onSuccess: (updatedData) => {
          dispatch(updateRow(updatedData._id)); // Ensure row updates in Redux
          reset({
            title: updatedData.title,
            description: updatedData.description,
          }); // Reset form with updated values
        },
      }
    );
  };

  useEffect(() => {
    if (tasks) {
      dispatch(setRows(tasks));
    }
  }, [tasks, dispatch]);

  if (isLoading) return <Loader />;
  if (!tasks || !tasks.length) return <>no data...</>;
  if (error) return <>{error}</>;

  const handleEditOpen = (row) => {
    dispatch(openUpdateDialog(row));
    dispatch(updateRow(row._id));
    reset({ title: row.title, description: row.description });
  };

  const handleEditClose = () => {
    dispatch(closeUpdateDialog());
  };

  const handleInfoOpen = (id) => {
    dispatch(openInfoDialog(id));
    dispatch(setRow(id));
  };

  const handleInfoClose = () => {
    dispatch(closeInfoDialog());
  };

  const renderActions = (params) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}>
      <Tooltip title="Info">
        <InfoIcon
          onClick={(e) => {
            e.stopPropagation();
            handleInfoOpen(params.row._id);
          }}
          style={{ cursor: "pointer", marginRight: "8px" }}
        />
      </Tooltip>
      <Tooltip title="Update">
        <EditIcon
          onClick={(e) => {
            e.stopPropagation();
            handleEditOpen(params.row);
          }}
          style={{ cursor: "pointer", marginRight: "8px" }}
        />
      </Tooltip>
      <Tooltip title="Delete">
        <DeleteIcon
          onClick={(e) => {
            e.stopPropagation();
            console.log(params.row._id);
          }}
          style={{ cursor: "pointer", color: "red" }}
        />
      </Tooltip>
    </div>
  );

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 4,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      flex: 0.5,
      renderCell: (params) => renderActions(params),
    },
  ];

  return (
    <Paper
      sx={{
        height: { xs: 550, sm: 600, md: 670 },
        width: "100%",
        overflow: "hidden",
      }}>
      <DataGrid
        rows={tasks}
        getRowId={(row) => row._id}
        columns={columns}
        initialState={{
          pagination: { paginationModel },
          columns: {
            columnVisibilityModel: {
              _id: false,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        sx={{
          border: 0,
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
      />
      <DialogComponent
        open={infoOpen}
        setOpen={() => handleInfoOpen(taskDetails?._id)}
        setClose={handleInfoClose}
        title="Task Details"
        acceptFun={null}
        acceptText={null}
        acceptIcon={null}>
        {taskDetails ? (
          <>
            <div>Title: {taskDetails?.title}</div>
            <div>Description: {taskDetails?.description}</div>
            <div>Priority: {taskDetails?.priority}</div>
          </>
        ) : (
          <div>Loading...{}</div>
        )}
      </DialogComponent>
      <DialogComponent
        open={editOpen}
        setOpen={() => handleEditOpen(updateTaskDetails)}
        setClose={handleEditClose}
        title="Edit Task"
        acceptFun={handleSubmit(handleUpdateTask)}
        acceptText="Edit"
        acceptIcon={<EditIcon />}>
        <Form
          register={register}
          errors={errors}
          updateTaskDetails={updateTaskDetails}
        />
      </DialogComponent>
    </Paper>
  );
}

