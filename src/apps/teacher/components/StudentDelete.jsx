import { useContext, useState } from "react";
import { deleteStudent } from "../services/student";
import { StudentContext } from "../context/StudentContext";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const forms = [
  { label: "รหัสนักศึกษา", name: "sid" },
  { label: "ชื่อสกุล", name: "name" },
  { label: "คณะ", name: "faculty" },
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

export default function StudentDelete({
  id,
  sid,
  prefix,
  fname,
  lname,
  faculty,
}) {
  const context = useContext(StudentContext);
  const [opened, setOpened] = useState(false);

  const dialog = {
    open: () => setOpened(true),
    close: () => setOpened(false),
  };

  const handler = async () => {
    const res = await deleteStudent(id);

    if (res === 200) {
      context.sync();
      dialog.close();
      context.flash("info", "ลบนักเรียนสำเร็จ");
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
        <DialogTitle align="center">ลบนักศึกษา</DialogTitle>
        <DialogContent>
          <DialogForm
            sid={sid}
            faculty={faculty}
            name={`${prefix}${fname} ${lname}`}
          />
          <DialogAction onClose={dialog.close} onSubmit={handler} />
        </DialogContent>
      </Dialog>
    </>
  );
}
