import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

export function StudentChangeSection({ subjectId, handler }) {
  const [status, setStatus] = useState(false);
  const [sectionNumber, setSectionNumber] = useState("");

  const open = () => {
    setStatus(true);
  };

  const close = () => {
    setStatus(false);
  };

  const change = async () => {
    await handler(subjectId, sectionNumber);

    setStatus(false);
  };

  return (
    <>
      <Button
        sx={{ marginRight: 1 }}
        size="small"
        color="warning"
        onClick={open}
      >
        เปลี่ยนตอนเรียน
      </Button>
      <Dialog open={status} onClose={close}>
        <DialogTitle>เปลี่ยนตอนเรียน</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ minWidth: 250 }}
            autoFocus
            margin="normal"
            label="ตอนเรียน"
            type="number"
            variant="outlined"
            fullWidth
            value={sectionNumber}
            onChange={(e) => setSectionNumber(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={close}>
            ยกเลิก
          </Button>
          <Button
            color="warning"
            variant="contained"
            disableElevation
            onClick={change}
          >
            เปลี่ยนตอนเรียน
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
