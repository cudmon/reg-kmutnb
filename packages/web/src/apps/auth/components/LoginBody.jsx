import { useState } from "react";
import axios from "../../../plugins/axios";
import { useAuthStore } from "../../../store/auth";
import {
  Alert,
  Button,
  Collapse,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export function LoginBody() {
  const [valid, setValid] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const store = useAuthStore((state) => state.update);

  const login = async () => {
    if (!username || !password) {
      return setEmpty(true);
    }

    setValid(true);
    setEmpty(false);

    try {
      const { data } = await axios.post("/auth/login", {
        username,
        password,
      });

      store({
        role: data.role,
        token: data.accessToken,
        name: data.name,
      });

      navigate("/");
    } catch (e) {
      if (e.response.status === 403) {
        return setValid(false);
      }

      setError(true);
    }
  };

  return (
    <Stack component="form" spacing={4} onSubmit={(e) => e.preventDefault()}>
      <Collapse in={!valid} unmountOnExit>
        <Alert onClose={() => setValid(true)} severity="warning">
          ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
        </Alert>
      </Collapse>
      <Collapse in={empty} unmountOnExit>
        <Alert onClose={() => setEmpty(false)} severity="warning">
          กรุณาป้อนข้อมูลให้ครบถ้วน
        </Alert>
      </Collapse>
      <TextField
        fullWidth
        label="ชื่อผู้ใช้"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        type="password"
        label="รหัสผ่าน"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        onClick={login}
      >
        เข้าสู่ระบบ
      </Button>
      <Snackbar
        open={error}
        autoHideDuration={1000}
        onClose={() => setError(false)}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert onClose={() => setError(false)} severity="error">
          มีบางอย่างผิดพลาด
        </Alert>
      </Snackbar>
    </Stack>
  );
}
