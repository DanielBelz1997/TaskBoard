import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "id", headerName: "ID", flex: 0.5 }, // Adjusted for small size
  { field: "title", headerName: "Title", flex: 1 },
  { field: "description", headerName: "Description", flex: 1 },
  {
    field: "priority",
    headerName: "Priority",
    type: "number",
    flex: 0.5, // Smaller column size
  },
];

const rows = [
  { id: 1, description: "Snow", title: "Jon", priority: 3.5 },
  { id: 2, description: "Lannister", title: "Cersei", priority: 4.2 },
  { id: 3, description: "Lannister", title: "Jaime", priority: 4.5 },
  { id: 4, description: "Stark", title: "Arya", priority: 1.6 },
  { id: 5, description: "Targaryen", title: "Daenerys", priority: null },
  { id: 6, description: "Melisandre", title: null, priority: 1.5 },
  { id: 7, description: "Clifford", title: "Ferrara", priority: 4.4 },
  { id: 8, description: "Frances", title: "Rossini", priority: 3.6 },
  { id: 9, description: "Roxie", title: "Harvey", priority: 6.5 },
];

const paginationModel = { page: 0, pageSize: 10 };

export function DataTable() {
  return (
    <Paper
      sx={{
        height: { xs: 600, sm: 600, md: 720 },
        width: "100%",
        overflow: "hidden",
      }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 10]}
        checkboxSelection
        sx={{
          border: 0,
          "& .MuiDataGrid-root": {
            fontFamily: "Roboto", // Replace with your preferred font
          },
          "& .MuiDataGrid-cell": {
            fontFamily: "Roboto",
            fontSize: "14px",
          },
          "& .MuiDataGrid-columnHeaders": {
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-footerContainer": {
            fontFamily: "Roboto",
            fontSize: "14px",
          },
        }}
      />
    </Paper>
  );
}

