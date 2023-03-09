import { updateSection } from "../services/section";
import { useContext, useState } from "react";
import { SectionContext } from "../context/SectionContext";
import {
  Box,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const DialogForm = ({ error, value, onChange }) => {
  return (
    <>
      <TextField
        size="small"
        value={value.subject}
        onChange={onChange}
        fullWidth
        margin="normal"
        label="วิชา"
        name="subject"
        disabled
        error={error.subject}
        required
      />
      <TextField
        size="small"
        value={value.section}
        onChange={onChange}
        fullWidth
        margin="normal"
        label="ตอนเรียนที่"
        type="number"
        name="section"
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
        placeholder="00:00:00"
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
        placeholder="00:00:00"
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
      <Button color="warning" onClick={onSubmit}>
        แก้ไข
      </Button>
    </Box>
  );
};

export default function SectionUpdate({
  id,
  subject,
  day,
  section,
  start,
  end,
}) {
  const context = useContext(SectionContext);
  const [opened, setOpened] = useState(false);
  const [input, setInput] = useState({
    subject,
    day,
    section,
    start,
    end,
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
        subject,
        day,
        section,
        start,
        end,
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

    if (Object.values(invalid).indexOf(true) > -1) {
      setInputError(invalid);
    } else {
      const res = await updateSection(id, {
        section_number: Number(input.section),
        section_start: input.start,
        section_end: input.end,
        section_day: Number(input.day),
      });

      if (res) {
        context.sync();
        dialog.close();
        context.flash("info", "แก้ไขตอนเรียนสำเร็จ");
      } else if (res === 403) {
        dialog.close();
        context.flash("error", "ไม่สามารถแก้ไขได้ คุณไม่ใช่เจ้าของตอนเรียน");
      } else {
        dialog.close();
        context.flash(
          "error",
          "มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง"
        );
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
      <Button size="large" color="warning" onClick={dialog.open}>
        แก้ไข
      </Button>
      <Dialog open={opened} onClose={dialog.close}>
        <DialogTitle align="center">แก้ไขตอนเรียน</DialogTitle>
        <DialogContent>
          <DialogForm error={inputError} value={input} onChange={handleInput} />
          <DialogAction onClose={dialog.close} onSubmit={handler} />
        </DialogContent>
      </Dialog>
    </>
  );
}