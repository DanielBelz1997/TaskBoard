import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";

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
    renderCell: (params) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%", // Ensures the full height of the cell is used
        }}>
        <Tooltip title="Update">
          <EditIcon
            onClick={(e) => {
              e.stopPropagation();
              console.log(params.id);
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
    ),
  },
];

const rows = [
  {
    id: 1,
    description:
      "Snow is a winter precipitation that forms when temperatures are low enough to freeze water vapor in the atmosphere.",
    title: "Jon Snow",
    priority: 3.5,
  },
  {
    id: 2,
    description:
      "Cersei Lannister, the ambitious queen of the Seven Kingdoms, is known for her cunning and ruthlessness.",
    title: "Cersei Lannister",
    priority: 4.2,
  },
  {
    id: 3,
    description:
      "Jaime Lannister, known as the Kingslayer, is a skilled swordsman and a member of House Lannister.",
    title: "Jaime Lannister",
    priority: 4.5,
  },
  {
    id: 4,
    description:
      "Arya Stark, the youngest daughter of Eddard Stark, is a fierce and determined warrior seeking vengeance for her family.",
    title: "Arya Stark",
    priority: 1.6,
  },
  {
    id: 5,
    description:
      "Daenerys Targaryen, the last surviving member of the Targaryen dynasty, aims to reclaim the Iron Throne and restore her family's legacy.",
    title: "Daenerys Targaryen",
    priority: 0,
  },
  {
    id: 6,
    description:
      "Melisandre, known as the Red Woman, is a priestess of the Lord of Light with a mysterious past and prophetic abilities.",
    title: "Melisandre",
    priority: 1.5,
  },
  {
    id: 7,
    description:
      "Clifford Ferrara is an influential merchant in the Free Cities, known for his extensive trade routes and connections.",
    title: "Clifford Ferrara",
    priority: 4.4,
  },
  {
    id: 8,
    description:
      "Frances Rossini, a talented musician and composer, is renowned for her enchanting melodies that captivate audiences.",
    title: "Frances Rossini",
    priority: 3.6,
  },
  {
    id: 9,
    description:
      "Roxie Harvey is a skilled diplomat with a knack for negotiation, often resolving conflicts in favor of her allies.",
    title: "Roxie Harvey",
    priority: 6.5,
  },
  {
    id: 10,
    description:
      "Tyrion Lannister, the witty and intelligent dwarf, often uses his sharp mind to navigate the treacherous political landscape of Westeros.",
    title: "Tyrion Lannister",
    priority: 5.0,
  },
  {
    id: 11,
    description:
      "Sansa Stark, the eldest Stark daughter, grows from a naive girl into a strong and capable leader amid the chaos of war.",
    title: "Sansa Stark",
    priority: 4.0,
  },
  {
    id: 12,
    description:
      "Brienne of Tarth is a noblewoman and skilled knight known for her loyalty, honor, and exceptional combat skills.",
    title: "Brienne of Tarth",
    priority: 3.8,
  },
  {
    id: 13,
    description:
      "Petyr Baelish, also known as Littlefinger, is a master manipulator whose ambition leads to chaos and conflict throughout the realm.",
    title: "Petyr Baelish",
    priority: 4.6,
  },
  {
    id: 14,
    description:
      "Varys, the spymaster of the realm, is known for his network of informants and his ability to gather secrets.",
    title: "Varys",
    priority: 4.3,
  },
  {
    id: 15,
    description:
      "Olenna Tyrell, the formidable matriarch of House Tyrell, is known for her sharp wit and political acumen.",
    title: "Olenna Tyrell",
    priority: 4.1,
  },
];

const paginationModel = { page: 0, pageSize: 10 };

export function DataTable() {
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
    </Paper>
  );
}

