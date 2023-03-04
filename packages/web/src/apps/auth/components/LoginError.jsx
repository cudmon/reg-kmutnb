import { Alert, Snackbar } from "@mui/material";

export default function LoginError({ open, onClose }) {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={1000}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Alert onClose={onClose} severity="error">
        มีบางอย่างผิดพลาด
      </Alert>
    </Snackbar>
  );
}
