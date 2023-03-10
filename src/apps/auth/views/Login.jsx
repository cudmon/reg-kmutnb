import { useState } from "react";
import { useAuth } from "@/store/auth";
import { login } from "../services/login";
import { useTitle } from "@/hooks/useTitle";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import LoginError from "../components/LoginError";
import LoginAlert from "../components/LoginAlert";
import LoginTitle from "../components/LoginTitle";
import LoginContainer from "../components/LoginContainer";

export default function LoginBody() {
  // Set page title
  useTitle("Login");

  // Router navigator
  const navigate = useNavigate();

  // Component state
  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInValid, setIsInValid] = useState(false);

  // Call auth store
  const store = useAuth((state) => state.update);

  const handler = async (username, password) => {
    // Check is value empty
    if (!username || !password) {
      return setIsEmpty(true);
    }

    // Login loading state
    setLoading(true);
    setIsEmpty(false);
    setIsInValid(false);

    // Login
    const profile = await login(username, password);

    // Login successfully
    if (!profile.error) {
      store(profile);
      navigate("/");
      setLoading(false);

      return true;
    }

    // Wrong username or password
    if (profile.error.code === 403) {
      setLoading(false);
      setIsInValid(true);

      return false;
    }

    // Exception for error
    setLoading(false);
    setIsError(true);
  };

  return (
    <LoginContainer>
      <LoginTitle />
      <LoginAlert
        open={isInValid}
        message="ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
        onClose={() => setIsInValid(false)}
      />
      <LoginAlert
        open={isEmpty}
        message="กรุณากรอกข้อมูลให้ครบถ้วน"
        onClose={() => setIsEmpty(false)}
      />
      <LoginForm
        loading={loading}
        onLogin={handler}
        error={isInValid || isEmpty}
      />
      <LoginError open={isError} onClose={() => setIsError(false)} />
    </LoginContainer>
  );
}
