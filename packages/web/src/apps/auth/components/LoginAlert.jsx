import { Alert, Collapse } from "@mui/material";

export default function LoginAlert({ open, message, onClose }) {
  return (
    <Collapse sx={{ marginBottom: 6 }} in={open} unmountOnExit>
      <Alert onClose={onClose} severity="warning">
        {message}
      </Alert>
    </Collapse>
  );
}
