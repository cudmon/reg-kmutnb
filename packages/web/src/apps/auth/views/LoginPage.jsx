import { LoginBody } from "../components/LoginBody";
import { LoginTitle } from "../components/LoginTitle";
import { LoginContainer } from "../components/LoginContainer";

export function LoginPage() {
  return (
    <LoginContainer>
      <LoginTitle />
      <LoginBody />
    </LoginContainer>
  );
}
