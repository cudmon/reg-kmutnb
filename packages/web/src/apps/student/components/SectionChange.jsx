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

const DialogForm = ({ subject, oldSection, newSection, onChange }) => {
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
      />
      <Box marginTop={2} display="flex">
        <TextField
          size="small"
          sx={{ marginRight: 1 }}
          fullWidth
          inputProps={{ readOnly: true }}
          value={oldSection}
          type="number"
          label="ตอนเรียนเดิม"
        />
        <FormControl size="small" fullWidth>
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
  const sync = useContext(Context);
  const [opened, setOpened] = useState(false);
  const [newSection, setNewSection] = useState("");

  const dialog = {
    open: () => setOpened(true),
    close: () => setOpened(false),
  };

  const handler = async () => {
    const res = await change(id, newSection);

    if (res) {
      sync();
      dialog.close();
      setNewSection("");
    }
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
