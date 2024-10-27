import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import { CustomizedDialogs } from "../components/Dialog.jsx";
import { useDispatch, useSelector } from "react-redux";
import { openDialog, closeDialog } from "../redux/dialogSlice.js";

const paginationModel = { page: 0, pageSize: 10 };

export function DataTable() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => {
    console.log(state);
    return state.api.rows;
  });
  const { open, selectedRow } = useSelector((state) => state.dialog);

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
      field: "id",
      headerName: "ID",
      flex: 0.2,
      align: "center",
      headerAlign: "center",
      filterable: false,
      sortable: false,
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
      flex: 1,
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
        rows={rows}
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
      <CustomizedDialogs
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

