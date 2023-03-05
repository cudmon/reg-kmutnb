import { http } from "@/plugins/http";
import { useAuth } from "@/store/auth";
import { useEffect, useState } from "react";
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

export default function SectionCreate({ handler }) {
  const [status, setStatus] = useState(false);
  const [number, setNumber] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [day, setDay] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [subject, setSubject] = useState([]);
  const token = useAuth((state) => state.token);

  const open = () => {
    setStatus(true);
  };

  const close = () => {
    setStatus(false);
  };

  const add = async () => {
    await handler({
      section_number: number,
      section_start: start,
      section_end: end,
      section_day: day,
      subject_id: subjectId,
      semester_id: 1,
    });

    setStatus(false);
  };

  useEffect(() => {
    (async () => {
      const { data } = await http.get("/subject", {
        headers: {
          "x-access-token": token,
        },
      });

      setSubject(data);
    })();
  }, []);

  return (
    <>
      <Button size="large" color="primary" variant="contained" onClick={open}>
        สร้าง
      </Button>
      <Dialog open={status} onClose={close}>
        <DialogTitle>สร้างตอนเรียน</DialogTitle>
        <DialogContent sx={{ minWidth: 300 }}>
          <FormControl sx={{ marginBlock: 1.3 }} fullWidth>
            <InputLabel id="subject">วิชา</InputLabel>
            <Select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              labelId="subject"
              label="วิชา"
              fullWidth
            >
              {subject.map((s) => (
                <MenuItem key={s.subject_id} value={s.subject_id}>
                  {s.subject_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            fullWidth
            margin="normal"
            label="ตอนเรียนที่"
          />
          <FormControl sx={{ marginBlock: 1.3 }} fullWidth>
            <InputLabel id="day">วัน</InputLabel>
            <Select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              labelId="day"
              label="วัน"
              fullWidth
            >
              <MenuItem value={1}>อาทิตย์</MenuItem>
              <MenuItem value={2}>จันทร์</MenuItem>
              <MenuItem value={3}>อังคาร</MenuItem>
              <MenuItem value={4}>พุทธ</MenuItem>
              <MenuItem value={5}>พฤหัสบดี</MenuItem>
              <MenuItem value={6}>ศุกร์</MenuItem>
              <MenuItem value={7}>เสาร์</MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={start}
            onChange={(e) => setStart(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="00:00:00"
            label="เริ่ม"
          />
          <TextField
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="00:00:00"
            label="สิ้นสุด"
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
            สร้าง
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
