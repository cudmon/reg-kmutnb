import validator from "validator";
import { useContext, useState } from "react";
import { updateStudent } from "../services/student";
import { StudentContext } from "../context/StudentContext";
import {
  Box,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
} from "@mui/material";

const forms = [
  { label: "คำนำหน้า", name: "prefix", error: "กรุณาใส่คำนำหน้า (ภาษาไทย)" },
  { label: "ชื่อ", name: "firstName", error: "กรุณาใส่ชื่อจริง (ภาษาไทย)" },
  { label: "สกุล", name: "lastName", error: "กรุณาใส่นามสกุล (ภาษาไทย)" },
  {
    label: "รหัสนักศึกษา",
    name: "sid",
    error: "กรุณาใส่รหัสนักศึกษา (13 หลัก)",
  },
];

const DialogForm = ({ error, value, onChange }) => {
  return (
    <>
      {forms.map((item) => (
        <TextField
          key={item.name}
          value={value[item.name]}
          onChange={onChange}
          fullWidth
          margin="normal"
          label={item.label}
          size="small"
          name={item.name}
          error={error[item.name]}
          required
        />
      ))}
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
      <Button color="warning" onClick={onSubmit} variant="contained">
        แก้ไข
      </Button>
    </Box>
  );
};

export default function StudentUpdate({ id, sid, fname, lname, prefix }) {
  const context = useContext(StudentContext);
  const [opened, setOpened] = useState(false);
  const [input, setInput] = useState({
    firstName: fname,
    lastName: lname,
    prefix,
    sid,
  });
  const [inputError, setInputError] = useState({
    prefix: false,
    firstName: false,
    lastName: false,
    sid: false,
  });

  const dialog = {
    open: () => setOpened(true),
    close: () => {
      setOpened(false);
      setInput({
        firstName: fname,
        lastName: lname,
        prefix,
        sid,
      });
    },
  };

  const handler = async () => {
    const invalid = {
      prefix: false,
      firstName: false,
      lastName: false,
      sid: false,
    };

    [
      { label: "คำนำหน้า", name: "prefix" },
      { label: "ชื่อ", name: "firstName" },
      { label: "รหัสนักศึกษา", name: "sid" },
    ].map((form) => {
      if (!input[form.name]) {
        invalid[form.name] = true;
      }
    });

    if (!validator.isAlpha(input.prefix, ["th-TH"])) {
      invalid["prefix"] = true;
    }

    if (!validator.isAlpha(input.firstName, ["th-TH"])) {
      invalid["firstName"] = true;
    }

    if (!validator.isAlpha(input.lastName, ["th-TH"])) {
      invalid["lastName"] = true;
    }

    if (
      !validator.isNumeric(input.sid) ||
      !validator.isLength(input.sid, { min: 13, max: 13 })
    ) {
      invalid["sid"] = true;
    }

    if (Object.values(invalid).indexOf(true) > -1) {
      setInputError(invalid);
    } else {
      const res = await updateStudent(id, {
        prefix: input.prefix,
        firstName: input.firstName,
        lastName: input.lastName,
      });

      if (res === 400) {
        dialog.close();
        context.flash("warning", "รหัสนักศึกษาไม่ถูกต้อง");
      } else if (res) {
        context.sync();
        dialog.close();
        context.flash("info", "แก้ไขนักเรียนสำเร็จ");
        setInput({
          prefix: input.prefix,
          firstName: input.firstName,
          lastName: input.lastName,
        });
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
        <DialogTitle align="center">แก้ไขนักศึกษา</DialogTitle>
        <DialogContent>
          <DialogForm error={inputError} value={input} onChange={handleInput} />
          <DialogAction onClose={dialog.close} onSubmit={handler} />
        </DialogContent>
      </Dialog>
    </>
  );
}
