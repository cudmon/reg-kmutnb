import { Context } from "../context";
import { useContext, useEffect, useState } from "react";
import { getRegistration, getSections, regis } from "../services";
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

const DialogForm = ({ error, value, onChange }) => {
  const [subjects, setSubjects] = useState([]);
  const [sections, setSections] = useState([]);
  const [isSubjectSelected, setIsSubjectSelected] = useState(false);

  useEffect(() => {
    (async () => {
      const { section } = await getSections();
      const registration = await getRegistration();
      const subjects = [];

      function push(array, item) {
        if (!array.find(({ code }) => code === item.code)) {
          array.push(item);
        }
      }

      section.map((el) => {
        if (
          !registration.find(
            ({ subject_code }) => subject_code === el.subject_code
          )
        ) {
          push(subjects, { name: el.subject_name, code: el.subject_code });
        }
      });

      setSubjects(subjects);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const secs = [];
      const { section } = await getSections();

      if (isSubjectSelected) {
        section.find((e) => {
          if (e.subject_code === value.subject) {
            secs.push(e.section_number);
          }
        });

        console.log(secs);

        setSections(secs);
      }
    })();
  }, [isSubjectSelected]);

  const handleChange = (event) => {
    onChange(event);
    setIsSubjectSelected(true);
  };

  return (
    <Box align="center">
      <FormControl error={error.subject} margin="normal" size="small" fullWidth>
        <InputLabel id="subject-label">วิชา</InputLabel>
        <Select
          labelId="subject-label"
          id="subject"
          value={value.subject}
          label="วิชา"
          onChange={handleChange}
          name="subject"
        >
          {subjects.map((subject) => (
            <MenuItem key={subject.code} value={subject.code}>
              {subject.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        disabled={!isSubjectSelected}
        margin="normal"
        size="small"
        fullWidth
        error={error.section}
      >
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
            <MenuItem key={section} value={section}>
              {section}
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
  const context = useContext(Context);
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState({
    section: false,
    subject: false,
  });

  const [input, setInput] = useState({
    subject: "",
    section: "",
  });

  const dialog = {
    open: () => setOpened(true),
    close: () => {
      setOpened(false);
      setInput({
        subject: "",
        section: "",
      });
    },
  };

  const handler = async () => {
    if (!input.subject) {
      return setError({
        ...error,
        subject: true,
      });
    }

    if (!input.section) {
      return setError({
        ...error,
        section: true,
      });
    }

    const res = await regis(input.subject, input.section);

    if (res) {
      context.sync();
      dialog.close();
      setInput({ subject: "", section: "" });
      context.flash("info", "ลงทะเบียนสำเร็จ");
    } else {
      dialog.close();
      context.flash("error", "มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง");
      setInput({ subject: "", section: "" });
    }

    setError({
      section: false,
      subject: false,
    });
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
          <DialogForm error={error} value={input} onChange={handleInput} />
          <DialogAction onClose={dialog.close} onSubmit={handler} />
        </DialogContent>
      </Dialog>
    </>
  );
}
