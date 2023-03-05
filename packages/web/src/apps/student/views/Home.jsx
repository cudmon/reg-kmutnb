import { Context } from "../context";
import { useEffect, useState } from "react";
import { getRegistration } from "../services";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";

import SectionRows from "../components/SectionRows";
import SectionHeader from "../components/SectionHeader";
import SectionColumns from "../components/SectionColumns";

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

  useEffect(() => {
    (async () => {
      const res = await getRegistration();

      if (res) {
        setRows(res);
      }
    })();
  }, []);

  const refresh = async () => {
    const res = await getRegistration();

    if (res) {
      setRows(res);
    }
  };

  return (
    <Context.Provider value={refresh}>
      <SectionHeader />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <SectionColumns columns={columns} />
          </TableHead>
          <TableBody>
            <SectionRows rows={rows} columns={columns} />
          </TableBody>
        </Table>
      </TableContainer>
    </Context.Provider>
  );
}
