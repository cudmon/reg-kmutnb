import { http } from "@/plugins/http";
import { useEffect, useState } from "react";
import { useAuth } from "@/store/auth";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
} from "@mui/material";

import StudentAddSection from "../components/SectionRegis";
import StudentWithdraw from "../components/SectionWithdraw";
import StudentChangeSection from "../components/SectionChange";

const columns = [
  {
    name: "subject_code",
    label: "รหัสวิชา",
    align: "left",
  },
  {
    name: "subject_name",
    label: "วิชา",
    align: "left",
  },
  {
    name: "section_number",
    label: "ตอนเรียน",
    align: "center",
  },
  {
    name: "teacher_tid",
    label: "อาจารย์",
    align: "center",
  },
];

export default function StudentHomePage() {
  const [rows, setRows] = useState([]);
  const token = useAuth((state) => state.token);

  const getClass = async () => {
    const { data } = await http.get("/registration", {
      headers: {
        "x-access-token": token,
      },
    });

    setRows(data);
  };

  const withdrawClass = async (id) => {
    try {
      await http.post(
        "/registration/withdraw",
        {
          section_id: id,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      getClass();
    } catch (e) {}
  };

  const changeSection = async (subjectId, sectionNumber) => {
    try {
      await http.post(
        "/registration/change",
        {
          subject_id: subjectId,
          section_number: sectionNumber,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      getClass();
    } catch {}
  };

  const regisSection = async (subjectCode, sectionNumber) => {
    try {
      await http.post(
        "/registration/regis",
        {
          subject_code: subjectCode,
          section_number: sectionNumber,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      getClass();
    } catch {}
  };

  useEffect(() => {
    getClass();
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
          ผลการลงทะเบียน
        </Typography>
        <StudentAddSection handler={regisSection} />
      </Stack>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.name} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.registration_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {columns.map((column) => (
                  <TableCell key={column.name} align={column.align}>
                    {row[column.name]}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <StudentChangeSection
                    subjectId={row.subject_id}
                    handler={changeSection}
                  />
                  <StudentWithdraw
                    id={row.section_id}
                    handler={withdrawClass}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
