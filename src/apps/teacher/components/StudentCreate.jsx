import validator from "validator";
import { useContext, useState } from "react";
import { createStudent } from "../services/student";
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
          helperText={error[item.name] && item.error}
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
      <Button color="primary" onClick={onSubmit} variant="contained">
        เพิ่ม
      </Button>
    </Box>
  );
};

export default function StudentCreate() {
  const context = useContext(StudentContext);
  const [opened, setOpened] = useState(false);
  const [input, setInput] = useState({
    sid: "",
    firstName: "",
    lastName: "",
    prefix: "",
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
        sid: "",
        firstName: "",
        lastName: "",
        prefix: "",
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
      { label: "นามสกุล", name: "lastName" },
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
      const res = await createStudent({
        student_sid: input.sid,
        student_prefix: input.prefix,
        student_first_name: input.firstName,
        student_last_name: input.lastName,
        student_password: input.sid,
        program_id: 1,
      });

      if (res) {
        context.sync();
        dialog.close();
        context.flash("info", "เพิ่มนักศึกษาสำเร็จ");
        setInput({ sid: "", firstName: "", lastName: "", prefix: "" });
      } else {
        dialog.close();
        context.flash(
          "error",
          "มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้งในภายหลัง"
        );
        setInput({ sid: "", firstName: "", lastName: "", prefix: "" });
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
        เพิ่ม
      </Button>
      <Dialog open={opened} onClose={dialog.close}>
        <DialogTitle align="center">เพิ่มนักศึกษา</DialogTitle>
        <DialogContent>
          <DialogForm error={inputError} value={input} onChange={handleInput} />
          <DialogAction onClose={dialog.close} onSubmit={handler} />
        </DialogContent>
      </Dialog>
    </>
  );
}
