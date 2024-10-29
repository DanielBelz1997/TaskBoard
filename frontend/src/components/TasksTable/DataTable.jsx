import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";

import { Form } from "../Form.jsx";
import { Loader } from "../Loader/index.jsx";
import { DisplayTask } from "../DisplayTask.jsx";
import { DialogComponent } from "../DialogComponent.jsx";
import { useUpdateTask } from "../../hooks/useUpdateTask.js";
import { useTasks } from "../../hooks/useGetFilteredTasks.js";
import { useGetTaskById } from "../../hooks/useGetTaskById.js";
import { setRows, setRow, updateRow } from "../../redux/apiSlice.js";
import {
  openUpdateSnackBar,
  closeUpdateSnackBar,
} from "../../redux/snackBarUpdate.js";
import {
  openUpdateDialog,
  closeUpdateDialog,
} from "../../redux/updateDialogSlice.js";
import {
  openInfoDialog,
  closeInfoDialog,
} from "../../redux/infoDialogSlice.js";
import {
  openDeleteSnackBar,
  closeDeleteSnackBar,
} from "../../redux/snackBarDelete.js";
import { useDeleteTask } from "../../hooks/useDeleteTask.js";

// eslint-disable-next-line react/prop-types
export const DataTable = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const { open: editOpen, selectedUpdateRowId } = useSelector(
    (state) => state.updateDialog
  );
  const { open: infoOpen, selectedRowId } = useSelector(
    (state) => state.infoDialog
  );
  const { open: openSnackBar } = useSelector((state) => state.updateSnackBar);

  const {
    data: tasks,
    isLoading,
    error,
  } = useTasks(paginationModel.page + 1, paginationModel.pageSize);

  const [lastTask, setLastTask] = React.useState(null);

  const deleteTaskMutation = useDeleteTask();

  const filteredTasks = React.useMemo(
    () =>
      tasks?.tasks?.filter(
        (task) =>
          // eslint-disable-next-line react/prop-types
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          // eslint-disable-next-line react/prop-types
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, tasks]
  );

  const { data: taskDetails } = useGetTaskById(
    selectedRowId ? selectedRowId : null
  );

  const { data: updateTaskDetails } = useGetTaskById(
    selectedUpdateRowId?._id ? selectedUpdateRowId?._id : null
  );

  const updateTaskMutation = useUpdateTask(selectedUpdateRowId?._id);

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeUpdateSnackBar());
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleUpdateTask = (values) => {
    updateTaskMutation.mutate(
      {
        title: values.title,
        description: values.description,
      },
      {
        onSuccess: (updatedData) => {
          dispatch(updateRow(updatedData._id));
          dispatch(closeUpdateDialog());
          dispatch(openUpdateSnackBar());
          reset({
            title: updatedData.title,
            description: updatedData.description,
          });
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
  if (!tasks?.tasks || !tasks?.tasks?.length) return <>no data...</>;
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

  const handlePageSizeChange = (newPageSize) => {
    setPaginationModel({ page: 0, pageSize: newPageSize });
  };

  const handlePaginationChange = (newModel) => {
    setPaginationModel(newModel);
  };

  const handleDeleteTask = (id) => {
    deleteTaskMutation.mutate(id, {
      onSuccess: (data) => {
        setLastTask(data?.task);
        dispatch(openDeleteSnackBar());
      },
    });
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
            handleDeleteTask(params.row._id);
          }}
          style={{ cursor: "pointer", color: "red" }}
        />
      </Tooltip>
    </div>
  );

  const renderPriority = (params) => {
    let name;
    let color;
    if (params.formattedValue <= 0.3) {
      name = "low";
      color = "success";
    } else if (params.formattedValue <= 0.7) {
      name = "medium";
      color = "warning";
    } else if (params.formattedValue >= 0.7) {
      name = "high";
      color = "error";
    }

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}>
        <Chip label={`${name}`} color={`${color}`} />
      </div>
    );
  };

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
      field: "priority",
      headerName: "Priority",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      renderCell: (params) => renderPriority(params),
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
    <>
      <Paper
        sx={{
          height: { xs: 550, sm: 600, md: 670 },
          width: "100%",
          overflow: "hidden",
        }}>
        <DataGrid
          rows={filteredTasks || []} // Using the paginated tasks
          columns={columns}
          paginationMode="server"
          rowCount={tasks?.meta?.totalTasks} // Total rows based on server response
          pageSizeOptions={[5, 10, 20]}
          pageSize={tasks.meta.pageSize}
          page={paginationModel.page}
          loading={isLoading}
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationChange}
          onPageSizeChange={handlePageSizeChange}
          disableRowSelectionOnClick
          getRowId={(row) => row._id}
          initialState={{
            pagination: { paginationModel },
            columns: {
              columnVisibilityModel: {
                _id: false,
              },
            },
          }}
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
          {taskDetails && <DisplayTask taskDetails={taskDetails} />}
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
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        message="Task Updated!"
        action={action}
      />
    </>
  );
};

