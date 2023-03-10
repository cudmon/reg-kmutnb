import { Context } from "../context";
import { useEffect, useState } from "react";
import { getRegistration } from "../services";
import {
  Alert,
  Paper,
  Snackbar,
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
  const [snack, setSnack] = useState(false);
  const [severity, setSeverity] = useState(null);
  const [message, setMessage] = useState("");

  const $alert = {
    open: () => setSnack(true),
    close: () => setSnack(false),
  };

  useEffect(() => {
    (async () => {
      const res = await getRegistration();

      if (res) {
        setRows(res);
      }
    })();
  }, []);

  const sync = async () => {
    const res = await getRegistration();

    if (res) {
      setRows(res);
    }
  };

  const flash = (severity, message) => {
    setMessage(message);
    setSeverity(severity);

    $alert.open();
  };

  return (
    <Context.Provider value={{ sync, flash }}>
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
    </Context.Provider>
  );
}
