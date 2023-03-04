import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";

export default function StudentSectionWithdraw({ handler, id }) {
  const [opened, setOpened] = useState(false);

  const withdraw = async () => {
    await handler(id);

    setStatus(false);
  };

  return (
    <>
      <Button size="small" color="error" onClick={() => setOpened(true)}>
        ถอนวิชาเรียน
      </Button>
      <Dialog open={opened} onClose={() => setOpened(false)}>
        <DialogTitle align="center">ถอนวิชาเรียน</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <Box align="center">
            <TextField
              size="small"
              fullWidth
              value="Database System"
              label="วิชา"
              margin="normal"
              inputProps={{ readOnly: true }}
            />
            <TextField
              size="small"
              fullWidth
              inputProps={{ readOnly: true }}
              value="1"
              margin="normal"
              label="ตอนเรียน"
            />
            <TextField
              size="small"
              fullWidth
              inputProps={{ readOnly: true }}
              value="ENS"
              margin="normal"
              label="ผู้สอน"
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
              color="error"
              variant="contained"
              disableElevation
              onClick={withdraw}
            >
              ถอนวิชาเรียน
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
