import { useState } from "react";
import { http } from "@/plugins/http";
import { useAuth } from "@/store/auth";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@mui/material";

import LoginForm from "../components/LoginForm";
import LoginError from "../components/LoginError";
import LoginAlert from "../components/LoginAlert";
import LoginTitle from "../components/LoginTitle";

export default function LoginBody() {
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const store = useAuth((state) => state.update);

  const login = async (username, password) => {
    setLoading(true);

    if (!username || !password) {
      setLoading(false);
      setIsEmpty(true);

      return false;
    }

    setIsValid(true);
    setIsEmpty(false);

    try {
      const { data } = await http().post("/auth/login", {
        username,
        password,
      });

      store({
        role: data.role,
        token: data.accessToken,
        name: data.name,
      });

      navigate("/");

      setLoading(false);
    } catch (e) {
      if (e.response.status === 403) {
        setLoading(false);
        setIsValid(false);

        return false;
      }

      setLoading(false);
      setIsError(true);
    }
  };

  return (
    <Card elevation={2} sx={{ paddingBottom: 2 }}>
      <CardContent sx={{ paddingInline: 4 }}>
        <LoginTitle />
        <LoginAlert
          message="ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
          open={!isValid}
          onClose={() => setIsValid(true)}
        />
        <LoginAlert
          open={isEmpty}
          message="กรุณากรอกข้อมูลให้ครบถ้วน"
          onClose={() => setIsEmpty(false)}
        />
        <LoginForm
          loading={loading}
          error={!isValid || isEmpty}
          onLogin={login}
        />
        <LoginError open={isError} onClose={() => setIsError(false)} />
      </CardContent>
    </Card>
  );
}
