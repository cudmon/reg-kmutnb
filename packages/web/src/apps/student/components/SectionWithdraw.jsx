import { Context } from "../context";
import { withdraw } from "../services";
import { useContext, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const forms = [
  { label: "วิชา", name: "subject" },
  { label: "ตอนเรียน", name: "section" },
  { label: "ผู้สอน", name: "teacher" },
];

const DialogForm = (props) => {
  return (
    <Box paddingTop={2} align="center">
      {forms.map((form) => (
        <TextField
          key={form.name}
          fullWidth
          size="small"
          margin="normal"
          label={form.label}
          value={props[form.name]}
          inputProps={{ readOnly: true }}
        />
      ))}
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
      <Button
        color="error"
        disableElevation
        onClick={onSubmit}
        variant="contained"
      >
        ถอนวิชาเรียน
      </Button>
    </Box>
  );
};

export default function SectionWithdraw({ id, subject, section, teacher }) {
  const sync = useContext(Context);
  const [opened, setOpened] = useState(false);

  const dialog = {
    open: () => setOpened(true),
    close: () => setOpened(false),
  };

  const handler = async () => {
    const res = await withdraw(id);

    if (res) {
      sync();
      dialog.close();
    }
  };

  return (
    <>
      <Button color="error" onClick={dialog.open}>
        ถอนวิชาเรียน
      </Button>
      <Dialog open={opened} onClose={dialog.close}>
        <DialogTitle align="center">ถอนวิชาเรียน</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          <DialogForm subject={subject} section={section} teacher={teacher} />
          <DialogAction onClose={dialog.close} onSubmit={handler} />
        </DialogContent>
      </Dialog>
    </>
  );
}
