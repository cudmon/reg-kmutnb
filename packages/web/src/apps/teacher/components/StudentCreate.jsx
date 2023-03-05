import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function StudentCreate({ handler }) {
  const [status, setStatus] = useState(false);
  const [prefix, setPrefix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentSid, setStudentSid] = useState("");
  const [defaultPassword, setDefaultPassword] = useState("");

  const open = () => {
    setStatus(true);
  };

  const close = () => {
    setStatus(false);
  };

  const add = async () => {
    await handler({
      student_prefix: prefix,
      student_first_name: firstName,
      student_last_name: lastName,
      student_sid: studentSid,
      student_password: defaultPassword,
      program_id: 1,
    });

    setStatus(false);
  };

  return (
    <>
      <Button size="large" color="primary" variant="contained" onClick={open}>
        เพิ่ม
      </Button>
      <Dialog open={status} onClose={close}>
        <DialogTitle>เพิ่มนักศึกษา</DialogTitle>
        <DialogContent sx={{ minWidth: 300 }}>
          <FormControl sx={{ marginBlock: 1.3 }} fullWidth>
            <InputLabel id="prefix">คำนำหน้า</InputLabel>
            <Select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              labelId="prefix"
              label="คำนำหน้า"
              fullWidth
            >
              <MenuItem value="นาย">นาย</MenuItem>
              <MenuItem value="นาง">นาง</MenuItem>
              <MenuItem value="นางสาว">นางสาว</MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
            label="ชื่อ"
          />
          <TextField
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
            label="นามสกุล"
          />
          <TextField
            value={studentSid}
            onChange={(e) => setStudentSid(e.target.value)}
            fullWidth
            margin="normal"
            label="รหัสนักศึกษา"
          />
          <TextField
            value={defaultPassword}
            onChange={(e) => setDefaultPassword(e.target.value)}
            fullWidth
            margin="normal"
            label="รหัสผ่านเริ่มต้น"
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={close}>
            ยกเลิก
          </Button>
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={add}
          >
            เพิ่ม
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
