import { Stack, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getRegistration } from "../services";

const columns = [
  {
    field: "subject_code",
    headerName: "รหัสวิชา",
    width: 125,
    align: "center",
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "subject_name",
    headerName: "วิชา",
    align: "center",
    flex: 1,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "section_number",
    headerName: "ตอนเรียน",
    align: "center",
    width: 100,
    sortable: false,
    headerAlign: "center",
  },
  {
    field: "teacher_tid",
    headerName: "อาจารย์",
    align: "center",
    sortable: false,
    width: 100,
    headerAlign: "center",
  },
  {
    field: "section_day",
    headerName: "วัน",
    headerAlign: "center",
    align: "center",
    sortable: false,
    width: 100,
    valueGetter: ({ row }) => {
      return [
        "อาทิตย์",
        "จันทร์",
        "อังคาร",
        "พุธ",
        "พฤหัสบดี",
        "ศุกร์",
        "เสาร์",
      ][row.section_day - 1];
    },
  },
  {
    field: "section_time",
    headerName: "เวลา",
    align: "center",
    sortable: false,
    flex: 1,
    headerClassName: "hideRightSeparator",
    headerAlign: "center",
    valueGetter: ({ row }) => {
      return `${row.section_start} - ${row.section_end}`;
    },
  },
];

export default function StudentHomePage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getRegistration();

      if (res) {
        setRows(res);
      }
    })();
  }, []);

  return (
    <>
      <Typography variant="h4" align="center" mb={3}>
        ผลการลงทะเบียน
      </Typography>
      <DataGrid
        autoHeight
        getRowId={(row) => row.section_id}
        columns={columns}
        rows={rows}
        disableColumnMenu
        disableSelectionOnClick
        pageSize={100}
        rowsPerPageOptions={[100]}
        hideFooter
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              คุณยังไม่ได้ลงทะเบียน
            </Stack>
          ),
        }}
        sx={{
          userSelect: "none",
          "& .hideRightSeparator > .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
            {
              outline: "none",
            },
          [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
            {
              outline: "none",
            },
        }}
      ></DataGrid>
    </>
  );
}
