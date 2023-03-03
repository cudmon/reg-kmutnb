import axios from "../../../plugins/axios";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/auth";
import { Box, Button, Stack, Typography } from "@mui/material";
import { TeacherDeleteSection } from "../components/TeacherDeleteSection";
import { TeacherAddSection } from "../components/TeacherAddSection";

export function TeacherHomePage() {
  const [rows, setRows] = useState([]);
  const token = useAuthStore((state) => state.token);

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
      valueGetter: (params) => {
        const day = params.row.section_day;

        return [
          "อาทิตย์",
          "จันทร์",
          "อังคาร",
          "พุธ",
          "พฤหัสบดี",
          "ศุกร์",
          "เสาร์",
        ][day - 1];
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
      renderCell: (params) => (
        <Box>
          <Button color="warning">แก้ไข</Button>
          <TeacherDeleteSection
            id={params.row.section_id}
            handler={deleteSection}
          />
        </Box>
      ),
    },
  ];

  const getSection = async () => {
    try {
      const { data } = await axios.get("/section", {
        headers: {
          "x-access-token": token,
        },
      });

      setRows(data.section);
    } catch {}
  };

  const deleteSection = async (id) => {
    try {
      await axios.delete(`/section/${id}`, {
        headers: {
          "x-access-token": token,
        },
      });

      getSection();
    } catch (e) {
      console.log(e);
      if (e.response.status === 403) {
        console.log("Not allow");
      }
    }
  };

  const addSection = async (data) => {
    try {
      await axios.post("/section", data, {
        headers: {
          "x-access-token": token,
        },
      });

      getSection();
    } catch {}
  };

  useEffect(() => {
    getSection();
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
          ตอนเรียน
        </Typography>
        <TeacherAddSection handler={addSection} />
      </Stack>
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
    </>
  );
}
