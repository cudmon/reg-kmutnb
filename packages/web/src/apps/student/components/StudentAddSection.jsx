import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export function StudentAddSection() {
  const [status, setStatus] = useState(false);

  const open = () => {
    setStatus(true);
  };

  const close = () => {
    setStatus(false);
  };

  const addClass = async () => {
    setStatus(false);
  };

  return (
    <>
      <Button size="large" onClick={open} variant="contained" color="primary">
        เพิ่ม
      </Button>
      <Dialog open={status} onClose={close}>
        <DialogTitle>เพิ่มวิชาเรียน</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="รหัสวิชา"
            type="text"
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            margin="normal"
            label="ตอนเรียน"
            type="number"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={close}>
            ยกเลิก
          </Button>
          <Button
            color="primary"
            disableElevation
            variant="contained"
            onClick={addClass}
          >
            เพิ่มวิชาเรียน
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
