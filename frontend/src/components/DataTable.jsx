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
import { useEffect, useState } from "react";
import { setRows, setRow, updateRow } from "../redux/apiSlice.js";
import { useTasks } from "../hooks/useGetFilteredTasks";
import { Loader } from "./Loader/index.jsx";
import InfoIcon from "@mui/icons-material/Info";
import { useGetTaskById } from "../hooks/useGetTaskById.js";
import { useUpdateTask } from "../hooks/useUpdateTask.js";

export function DataTable() {
  const dispatch = useDispatch();
  const { open: editOpen, selectedUpdateRowId } = useSelector(
    (state) => state.updateDialog
  );
  const { open: infoOpen, selectedRowId } = useSelector(
    (state) => state.infoDialog
  );

  const { data: tasksData, isLoading, isError } = useTasks();

  const { data: taskDetails } = useGetTaskById(
    selectedRowId ? selectedRowId : null
  );

  const { data: updateTaskDetails } = useGetTaskById(
    selectedUpdateRowId?._id ? selectedUpdateRowId?._id : null
  );

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });

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
    if (tasksData) {
      dispatch(setRows(tasksData));
    }
  }, [tasksData, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({
        ...old,
        isLoading: true,
      }));
      const res = await fetch(
        `http://localhost:3000/api/tasks?page=${pageState.page}&limit${pageState.pageSize}`
      );
      const json = await res.json();

      console.log(json);
      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: json.tasks,
        total: json.totalTasks,
      }));
    };
    fetchData();
  }, [pageState.page, pageState.pageSize]);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error fetching data</div>;

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
        rows={pageState.data}
        rowCount={pageState.total}
        loading={pageState.isLoading}
        getRowId={(row) => row._id}
        pageSizeOptions={[10, 20, 30]}
        pagination
        page={pageState.page - 1}
        pageSize={pageState.pageSize}
        paginationMode="server"
        onPageChange={(newPage) =>
          setPageState((old) => ({ ...old, page: newPage }))
        }
        onPageSizeChange={(newPageSize) =>
          setPageState((old) => ({ ...old, pageSize: newPageSize }))
        }
        columns={columns}
        initialState={{
          columns: {
            columnVisibilityModel: {
              _id: false,
            },
          },
        }}
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

