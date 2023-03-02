import { loginTheme } from "../../../theme";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";

export function LoginContainer({ children }) {
  return (
    <ThemeProvider theme={loginTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box px={4} py={8}>
          {children}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
