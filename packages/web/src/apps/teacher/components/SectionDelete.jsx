import { useContext, useState } from "react";
import { deleteSection } from "../services/section";
import { SectionContext } from "../context/SectionContext";
import {
  Box,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
} from "@mui/material";

const forms = [
  { label: "รหัสวิชา", name: "code" },
  { label: "วิชา", name: "name" },
  { label: "ตอนเรียน", name: "section" },
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
          focused={false}
          inputProps={{ readOnly: true }}
          sx={{ backgroundColor: "#e2e8f0" }}
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
      <Button color="error" onClick={onSubmit} variant="contained">
        ลบ
      </Button>
    </Box>
  );
};

export default function SectionDelete({ id, name, code, section }) {
  const context = useContext(SectionContext);
  const [opened, setOpened] = useState(false);

  const dialog = {
    open: () => setOpened(true),
    close: () => setOpened(false),
  };

  const handler = async () => {
    const res = await deleteSection(id);

    if (res === 200) {
      context.sync();
      dialog.close();
      context.flash("info", "ลบตอนเรียนสำเร็จ");
    } else if (res === 403) {
      dialog.close();
      context.flash("error", "ไม่สามารถลบได้ คุณไม่ใช่เจ้าตอนเรียน");
    } else {
      dialog.close();
      context.flash("error", "มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง");
    }
  };

  return (
    <>
      <Button color="error" onClick={dialog.open}>
        ลบ
      </Button>
      <Dialog open={opened} onClose={dialog.close}>
        <DialogTitle align="center">ลบตอนเรียน</DialogTitle>
        <DialogContent>
          <DialogForm name={name} code={code} section={section} />
          <DialogAction onClose={dialog.close} onSubmit={handler} />
        </DialogContent>
      </Dialog>
    </>
  );
}
