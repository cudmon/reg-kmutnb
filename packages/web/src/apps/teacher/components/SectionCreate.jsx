import validator from "validator";
import { getSubjects } from "../services/subject";
import { createSection } from "../services/section";
import { useContext, useEffect, useState } from "react";
import { SectionContext } from "../context/SectionContext";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";

const DialogForm = ({ error, value, onChange }) => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getSubjects();

      if (res) {
        setSubjects(res);
      }
    })();
  }, []);

  return (
    <>
      <FormControl
        error={error.subject}
        required
        size="small"
        margin="normal"
        fullWidth
      >
        <InputLabel id="subject">วิชา</InputLabel>
        <Select
          value={value.subject}
          onChange={onChange}
          labelId="subject"
          label="วิชา"
          fullWidth
          name="subject"
        >
          {subjects.map((s) => (
            <MenuItem key={s.subject_id} value={s.subject_id}>
              {s.subject_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        size="small"
        value={value.number}
        onChange={onChange}
        fullWidth
        margin="normal"
        label="ตอนเรียนที่"
        type="number"
        name="section"
        inputProps={{ min: "1" }}
        error={error.section}
        required
      />
      <FormControl
        error={error.day}
        required
        size="small"
        margin="normal"
        fullWidth
      >
        <InputLabel id="day">วัน</InputLabel>
        <Select
          value={value.day}
          onChange={onChange}
          labelId="day"
          label="วัน"
          fullWidth
          name="day"
        >
          <MenuItem value={1}>อาทิตย์</MenuItem>
          <MenuItem value={2}>จันทร์</MenuItem>
          <MenuItem value={3}>อังคาร</MenuItem>
          <MenuItem value={4}>พุธ</MenuItem>
          <MenuItem value={5}>พฤหัสบดี</MenuItem>
          <MenuItem value={6}>ศุกร์</MenuItem>
          <MenuItem value={7}>เสาร์</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="start"
        size="small"
        value={value.start}
        onChange={onChange}
        fullWidth
        margin="normal"
        placeholder="00:00"
        label="เริ่ม"
        error={error.start}
        required
      />
      <TextField
        name="end"
        size="small"
        value={value.end}
        onChange={onChange}
        fullWidth
        margin="normal"
        placeholder="00:00"
        label="สิ้นสุด"
        error={error.end}
        required
      />
    </>
  );
};

const DialogAction = ({ onClose, onSubmit }) => {
  return (
    <Box
      marginTop={4}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Button color="secondary" onClick={onClose}>
        ยกเลิก
      </Button>
      <Button color="primary" onClick={onSubmit} variant="contained">
        สร้าง
      </Button>
    </Box>
  );
};

export default function SectionCreate() {
  const { sync, flash } = useContext(SectionContext);
  const [opened, setOpened] = useState(false);
  const [input, setInput] = useState({
    subject: "",
    day: "",
    section: "",
    start: "",
    end: "",
  });
  const [inputError, setInputError] = useState({
    subject: false,
    day: false,
    section: false,
    start: false,
    end: false,
  });

  const dialog = {
    open: () => setOpened(true),
    close: () => {
      setOpened(false);
      setInput({
        subject: "",
        day: "",
        section: "",
        start: "",
        end: "",
      });
    },
  };

  const handler = async () => {
    const invalid = {
      subject: false,
      day: false,
      section: false,
      start: false,
      end: false,
    };

    ["subject", "day", "section", "start", "end"].map((form) => {
      if (!input[form]) {
        invalid[form] = true;
      }
    });

    if (Number(input.section) < 1) {
      invalid["section"] = true;
    }

    if (!/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$/.test(input.start)) {
      invalid["start"] = true;
    }

    if (!/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])?$/.test(input.end)) {
      invalid["end"] = true;
    }

    if (Object.values(invalid).indexOf(true) > -1) {
      setInputError(invalid);
    } else {
      const res = await createSection({
        section_start: input.start,
        section_end: input.end,
        section_day: input.day,
        section_number: input.section,
        subject_id: input.subject,
        semester_id: 1,
      });

      if (res) {
        sync();

        flash("info", "เพิ่มตอนเรียนสำเร็จ");

        dialog.close();
        setInputError({
          subject: false,
          day: false,
          section: false,
          start: false,
          end: false,
        });
        setInput({ subject: "", day: "", section: "", start: "", end: "" });
      } else {
        dialog.close();
        flash("error", "มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง");
        setInputError({
          subject: false,
          day: false,
          section: false,
          start: false,
          end: false,
        });
        setInput({ subject: "", day: "", section: "", start: "", end: "" });
      }
    }
  };

  const handleInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Button
        size="large"
        color="primary"
        variant="contained"
        onClick={dialog.open}
      >
        สร้าง
      </Button>
      <Dialog open={opened} onClose={dialog.close}>
        <DialogTitle align="center">สร้างตอนเรียน</DialogTitle>
        <DialogContent sx={{ minWidth: 300 }}>
          <DialogForm error={inputError} value={input} onChange={handleInput} />
          <DialogAction onClose={dialog.close} onSubmit={handler} />
        </DialogContent>
      </Dialog>
    </>
  );
}
