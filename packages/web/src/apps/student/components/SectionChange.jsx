import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function StudentSectionChange({ subjectId, handler }) {
  const [opened, setOpened] = useState(false);
  const [sectionNumber, setSectionNumber] = useState("");

  const change = async () => {
    await handler(subjectId, sectionNumber);

    setOpened(false);
  };

  return (
    <>
      <Button
        sx={{ marginRight: 1 }}
        size="small"
        color="warning"
        onClick={() => setOpened(true)}
      >
        เปลี่ยนตอนเรียน
      </Button>
      <Dialog open={opened} onClose={() => setOpened(false)}>
        <DialogTitle align="center">เปลี่ยนตอนเรียน</DialogTitle>
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
            <Box display="flex">
              <TextField
                size="small"
                sx={{ marginRight: 1 }}
                fullWidth
                inputProps={{ readOnly: true }}
                value="1"
                type="number"
                margin="normal"
                label="ตอนเรียนเดิม"
              />
              <TextField
                size="small"
                fullWidth
                sx={{ marginLeft: 1 }}
                value={sectionNumber}
                type="number"
                margin="normal"
                label="ตอนเรียนใหม่"
                required
                onChange={(e) => setSectionNumber(e.target.value)}
              />
            </Box>
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
              onClick={change}
              color="warning"
              variant="contained"
              disableElevation
              type="submit"
            >
              เปลี่ยนตอนเรียน
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
