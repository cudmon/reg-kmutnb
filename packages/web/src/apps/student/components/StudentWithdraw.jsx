import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

export function StudentWithdraw({ handler, id }) {
  const [status, setStatus] = useState(false);

  const open = () => {
    setStatus(true);
  };

  const close = () => {
    setStatus(false);
  };

  const withdraw = async () => {
    await handler(id);

    setStatus(false);
  };

  return (
    <>
      <Button size="small" color="error" onClick={open}>
        ถอนวิชาเรียน
      </Button>
      <Dialog open={status} onClose={close}>
        <DialogTitle>ถอนวิชา</DialogTitle>
        <DialogContent sx={{ minWidth: 300 }}>
          <DialogContentText>คุณแน่ใจหรือไม่</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={close}>
            ยกเลิก
          </Button>
          <Button
            color="error"
            variant="contained"
            disableElevation
            onClick={withdraw}
          >
            ถอนวิชาเรียน
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
