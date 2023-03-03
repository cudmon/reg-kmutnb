import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

export function TeacherDeleteStudent({ handler, id }) {
  const [status, setStatus] = useState(false);

  const open = () => {
    setStatus(true);
  };

  const close = () => {
    setStatus(false);
  };

  const remove = async () => {
    await handler(id);

    setStatus(false);
  };

  return (
    <>
      <Button color="error" onClick={open}>
        ลบ
      </Button>
      <Dialog open={status} onClose={close}>
        <DialogTitle>ลบนักเรียน</DialogTitle>
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
            onClick={remove}
          >
            ลบ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
