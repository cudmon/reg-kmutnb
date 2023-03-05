import { Context } from "../context";
import { useContext, useEffect, useState } from "react";
import { getRegistration, getSections, getSubjects, regis } from "../services";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const DialogForm = ({ value, onChange }) => {
  const [subjects, setSubjects] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    (async () => {
      const registration = await getRegistration();
      const sections = await getSections();

      setSubjects(sections.section);
      setSections(sections.section);
    })();
  }, []);

  return (
    <Box align="center">
      <FormControl margin="normal" size="small" fullWidth>
        <InputLabel id="subject-label">วิชา</InputLabel>
        <Select
          labelId="subject-label"
          id="subject"
          value={value.subject}
          label="วิชา"
          onChange={onChange}
          name="subject"
        >
          {subjects.map((subject) => (
            <MenuItem key={subject.subject_id} value={subject.subject_code}>
              {subject.subject_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl margin="normal" size="small" fullWidth>
        <InputLabel id="section-label">ตอนเรียน</InputLabel>
        <Select
          labelId="section-label"
          id="section"
          value={value.section}
          label="ตอนเรียน"
          onChange={onChange}
          name="section"
        >
          {sections.map((section) => (
            <MenuItem key={section.section_id} value={section.section_number}>
              {section.section_number}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
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
      <Button color="success" variant="contained" onClick={onSubmit}>
        ลงทะเบียน
      </Button>
    </Box>
  );
};

export default function SectionRegis() {
  const sync = useContext(Context);
  const [opened, setOpened] = useState(false);

  const [input, setInput] = useState({
    subject: "",
    section: "",
  });

  const dialog = {
    open: () => setOpened(true),
    close: () => setOpened(false),
  };

  const handler = async () => {
    const res = await regis(input.subject, input.section);

    if (res) {
      sync();
      dialog.close();
      setInput({ subject: "", section: "" });
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
        onClick={dialog.open}
        variant="contained"
        color="primary"
      >
        ลงทะเบียน
      </Button>
      <Dialog open={opened} onClose={dialog.close}>
        <DialogTitle align="center">ลงทะเบียน</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <DialogForm value={input} onChange={handleInput} />
          <DialogAction onClose={dialog.close} onSubmit={handler} />
        </DialogContent>
      </Dialog>
    </>
  );
}
