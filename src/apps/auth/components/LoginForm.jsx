import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";

export default function LoginForm({ loading, error, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Stack component="form" spacing={4} onSubmit={(e) => e.preventDefault()}>
      <TextField
        fullWidth
        label="ชื่อผู้ใช้"
        error={error}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        error={error}
        label="รหัสผ่าน"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={loading}
        onClick={() => onLogin(username, password)}
      >
        เข้าสู่ระบบ
      </LoadingButton>
    </Stack>
  );
}
