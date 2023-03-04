import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function StudentSectionRegis({ handler }) {
  const [status, setOpened] = useState(false);
  const [subjectCode, setSubjectCode] = useState("");
  const [sectionNumber, setSectionNumber] = useState("");

  const open = () => {
    setOpened(true);
  };

  const close = () => {
    setOpened(false);
  };

  const addClass = async () => {
    await handler(subjectCode, sectionNumber);

    setOpened(false);
  };

  return (
    <>
      <Button
        disableElevation
        size="large"
        onClick={open}
        variant="contained"
        color="primary"
      >
        ลงทะเบียน
      </Button>
      <Dialog open={status} onClose={close}>
        <DialogTitle align="center">ลงทะเบียน</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <Box align="center">
            <TextField
              size="small"
              fullWidth
              label="รหัสวิชา"
              margin="normal"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
            />
            <TextField
              size="small"
              fullWidth
              value={sectionNumber}
              margin="normal"
              label="ตอนเรียน"
              onChange={(e) => setSectionNumber(e.target.value)}
            />
          </Box>
          <Box
            marginTop={4}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button color="secondary" onClick={() => setOpened(false)}>
              ยกเลิก
            </Button>
            <Button
              color="success"
              variant="contained"
              disableElevation
              onClick={addClass}
            >
              ลงทะเบียน
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
