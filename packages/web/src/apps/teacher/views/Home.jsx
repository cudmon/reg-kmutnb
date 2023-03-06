import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import { getSections } from "../services/section";
import { SectionContext } from "../context/SectionContext";

import SectionDelete from "../components/SectionDelete";
import SectionUpdate from "../components/SectionUpdate";
import SectionHeader from "../components/SectionHeader";

export default function TeacherHomePage() {
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
      field: "subject_code",
      headerName: "รหัสวิชา",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "subject_name",
      headerName: "วิชา",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "section_number",
      headerName: "ตอนเรียน",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "teacher_tid",
      headerName: "ผู้สอน",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "section_day",
      headerName: "วัน",
      align: "center",
      headerAlign: "center",
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
      field: "section_start",
      headerName: "เริ่ม",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "section_end",
      headerName: "เสร็จสิ้น",
      align: "center",
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
          <SectionUpdate
            id={row.section_id}
            subject={row.subject_name}
            section={row.section_number}
            start={row.section_start}
            end={row.section_end}
            day={row.section_day}
          />
          <SectionDelete
            id={row.section_id}
            name={row.subject_name}
            code={row.subject_code}
            section={row.section_number}
          />
        </Box>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      const res = await getSections();

      if (res) {
        setRows(res.section);
      }
    })();
  }, []);

  const sync = async () => {
    const res = await getSections();

    if (res) {
      setRows(res.section);
    }
  };

  const flash = (severity, message) => {
    setMessage(message);
    setSeverity(severity);

    $alert.open();
  };

  return (
    <SectionContext.Provider value={{ sync, flash }}>
      <SectionHeader />
      <DataGrid
        autoHeight
        getRowId={(row) => row.section_id}
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
    </SectionContext.Provider>
  );
}
