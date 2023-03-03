import axios from "../../../plugins/axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/auth";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { StudentWithdraw } from "./StudentWithdraw";
import { StudentChangeSection } from "./StudentChangeSection";

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

export function StudentClassList() {
  const [rows, setRows] = useState([]);
  const token = useAuthStore((state) => state.token);

  const getClass = async () => {
    const { data } = await axios.get("/registration", {
      headers: {
        "x-access-token": token,
      },
    });

    setRows(data);
  };

  const withdrawClass = async (id) => {
    try {
      await axios.post(
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
      await axios.post(
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

  useEffect(() => {
    getClass();
  }, []);

  return (
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
                <StudentWithdraw id={row.section_id} handler={withdrawClass} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
