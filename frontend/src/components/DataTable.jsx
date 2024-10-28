import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import { DialogComponent } from "./DialogComponent.jsx";
import { useDispatch, useSelector } from "react-redux";
import { openDialog, closeDialog } from "../redux/updateDialogSlice.js";
import { useEffect } from "react";
import { setRows } from "../redux/apiSlice.js";
import { useTasks } from "../hooks/useGetFilteredTasks";
import { Loader } from "./Loader/index.jsx";

const paginationModel = { page: 0, pageSize: 10 };

export function DataTable() {
  const dispatch = useDispatch();
  const { data: tasks, isLoading, error } = useTasks();
  const { open, selectedRow } = useSelector((state) => state.updateDialog);

  useEffect(() => {
    if (tasks) {
      dispatch(setRows(tasks));
    }
  });

  if (isLoading) return <Loader />;
  if (error) return <>{error}</>;

  const handleEditOpen = (row) => {
    dispatch(openDialog(row));
  };

  const handleClose = () => {
    dispatch(closeDialog());
  };

  const renderActions = (params) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}>
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
            console.log(params.id);
          }}
          style={{ cursor: "pointer", color: "red" }}
        />
      </Tooltip>
    </div>
  );

  const columns = [
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
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
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
        initialState={{ pagination: { paginationModel } }}
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
        open={open}
        onClose={handleClose}
        title="Edit Item"
        content={[
          `Title: ${selectedRow?.title || ""}`,
          `Description: ${selectedRow?.description || ""}`,
          `Priority: ${selectedRow?.priority || ""}`,
        ]}
        buttonText="Save Changes"
      />
    </Paper>
  );
}

