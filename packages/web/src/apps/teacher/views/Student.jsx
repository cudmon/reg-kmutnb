import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getStudents } from "../services/student";
import { StudentContext } from "../context/StudentContext";
import { Alert, Box, Snackbar } from "@mui/material";

import StudentHeader from "../components/StudentHeader";
import StudentUpdate from "../components/StudentUpdate";
import StudentDelete from "../components/StudentDelete";

export default function TeacherStudentPage() {
  const [rows, setRows] = useState([]);
  const [snack, setSnack] = useState(false);
  const [severity, setSeverity] = useState(null);
  const [message, setMessage] = useState("");

  const $alert = {
    open: () => setSnack(true),
    close: () => setSnack(false),
  };

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
      renderCell: ({ row }) => (
        <Box>
          <StudentUpdate
            id={row.student_id}
            prefix={row.student_prefix}
            fname={row.student_first_name}
            lname={row.student_last_name}
          />
          <StudentDelete
            id={row.student_id}
            sid={row.student_sid}
            prefix={row.student_prefix}
            fname={row.student_first_name}
            lname={row.student_last_name}
            faculty={row.faculty_name}
          />
        </Box>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      const res = await getStudents();

      if (res) {
        setRows(res.student);
      }
    })();
  }, []);

  const sync = async () => {
    const res = await getStudents();

    if (res) {
      setRows(res.student);
    }
  };

  const flash = (severity, message) => {
    setMessage(message);
    setSeverity(severity);

    $alert.open();
  };

  return (
    <StudentContext.Provider value={{ sync, flash }}>
      <StudentHeader />
      <DataGrid
        autoHeight
        getRowId={(row) => row.student_id}
        columns={columns}
        rows={rows}
        disableColumnMenu
        disableSelectionOnClick
        pageSize={10}
        rowsPerPageOptions={[10]}
      ></DataGrid>
      <Snackbar
        open={snack}
        onClose={$alert.close}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={$alert.close}
          severity={severity}
        >
          {message}
        </Alert>
      </Snackbar>
    </StudentContext.Provider>
  );
}
