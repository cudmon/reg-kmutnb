import { Context } from "../context";
import { change, getSections } from "../services";
import { useContext, useEffect, useState } from "react";
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
  TextField,
} from "@mui/material";

const DialogForm = ({ error, subject, oldSection, newSection, onChange }) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getSections();

      const list = data.section
        .filter((s) => s.subject_name === subject)
        .filter((s) => s.section_number !== oldSection);

      setSections(list);
    })();
  }, []);

  return (
    <Box paddingTop={2} align="center">
      <TextField
        size="small"
        fullWidth
        value={subject}
        label="วิชา"
        margin="normal"
        inputProps={{ readOnly: true }}
        sx={{ backgroundColor: "#e2e8f0" }}
      />
      <Box marginTop={2} display="flex">
        <TextField
          size="small"
          fullWidth
          value={oldSection}
          type="number"
          label="ตอนเรียนเดิม"
          focused={false}
          inputProps={{ readOnly: true }}
          sx={{ backgroundColor: "#e2e8f0", marginRight: 1 }}
        />
        <FormControl error={error} size="small" fullWidth>
          <InputLabel id="new-section-label">ตอนเรียนใหม่</InputLabel>
          <Select
            labelId="new-section-label"
            id="new-section"
            value={newSection}
            label="ตอนเรียนใหม่"
            onChange={onChange}
          >
            {sections.map((section) => (
              <MenuItem key={section.section_id} value={section.section_number}>
                {section.section_number}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
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
      <Button onClick={onSubmit} color="warning" variant="contained">
        เปลี่ยนตอนเรียน
      </Button>
    </Box>
  );
};

export default function SectionChange({ id, subject, oldSection }) {
  const { sync, flash } = useContext(Context);
  const [opened, setOpened] = useState(false);
  const [newSection, setNewSection] = useState("");
  const [error, setError] = useState(false);

  const dialog = {
    open: () => setOpened(true),
    close: () => {
      setOpened(false);
      setNewSection("");
    },
  };

  const handler = async () => {
    if (!newSection) {
      return setError(true);
    }
    const res = await change(id, newSection);

    if (res) {
      sync();
      flash("info", "เปลี่ยนตอนเรียนสำเร็จ");
    } else {
      flash("error", "มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง");
    }

    dialog.close();
    setNewSection("");
    setError(false);
  };

  const handleInput = (event) => {
    setNewSection(event.target.value);
  };

  return (
    <>
      <Button color="warning" onClick={dialog.open}>
        เปลี่ยนตอนเรียน
      </Button>
      <Dialog open={opened} onClose={dialog.close}>
        <DialogTitle align="center">เปลี่ยนตอนเรียน</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <DialogForm
            error={error}
            subject={subject}
            oldSection={oldSection}
            newSection={newSection}
            onChange={handleInput}
          />
          <DialogAction onClose={dialog.close} onSubmit={handler} />
        </DialogContent>
      </Dialog>
    </>
  );
}
