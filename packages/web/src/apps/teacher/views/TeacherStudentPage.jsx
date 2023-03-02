import axios from "../../../plugins/axios";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/auth";
import { Box, Button, Stack, Typography } from "@mui/material";

const columns = [
  {
    field: "student_sid",
    headerName: "รหัสนักศึกษา",
    width: 150,
  },
  {
    field: "student_name",
    headerName: "ชื่อ",
    flex: 1,
    align: "left",
    headerAlign: "left",
    valueGetter: ({ row }) => {
      return `${row.student_prefix} ${row.student_first_name} ${row.student_last_name}`;
    },
  },
  {
    field: "major_name",
    headerName: "สาขา",
    align: "center",
    flex: 0.5,
    headerAlign: "center",
  },
  {
    field: "faculty_name",
    headerName: "คณะ",
    align: "center",
    flex: 0.5,
    headerAlign: "center",
  },
  {
    field: "action",
    headerName: "จัดการ",
    align: "center",
    headerAlign: "center",
    width: 200,
    renderCell: () => (
      <Box>
        <Button color="warning">แก้ไข</Button>
        <Button color="error">ลบ</Button>
      </Box>
    ),
  },
];

export function TeacherStudentPage() {
  const [rows, setRows] = useState([]);
  const token = useAuthStore((state) => state.token);

  const getStudent = async () => {
    const { data } = await axios.get("/student", {
      headers: {
        "x-access-token": token,
      },
    });

    setRows(data.student);
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <>
      <Stack
        mb={3}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontWeight={500} variant="h5">
          นักเรียน
        </Typography>
        <Button size="large" variant="contained">
          เพิ่ม
        </Button>
      </Stack>
      <DataGrid
        autoHeight
        getRowId={(row) => row.student_id}
        columns={columns}
        rows={rows}
        disableColumnMenu
        disableSelectionOnClick
        pageSize={10}
      ></DataGrid>
    </>
  );
}
