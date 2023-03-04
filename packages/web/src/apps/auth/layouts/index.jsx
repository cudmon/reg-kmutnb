import { Outlet } from "react-router-dom";
import { loginTheme as theme } from "@/theme";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";

export default function LoginLayout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box px={4} py={20}>
          <Outlet />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
