import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { getSections } from "../services/section";
import { SectionContext } from "../context/SectionContext";

import SectionDelete from "../components/SectionDelete";
import SectionHeader from "../components/SectionHeader";

export default function TeacherHomePage() {
  const [rows, setRows] = useState([]);

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
          <Button color="warning">แก้ไข</Button>
          <SectionDelete id={row.section_id} />
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

  const refresh = async () => {
    const res = await getStudents();

    if (res) {
      setRows(res.student);
    }
  };

  return (
    <SectionContext.Provider value={refresh}>
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
    </SectionContext.Provider>
  );
}
