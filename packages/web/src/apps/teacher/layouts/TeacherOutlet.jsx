import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";

export function TeacherOutlet({ opened, mobile, width }) {
  return (
    <Box py={5} px={2} marginLeft={opened && !mobile ? `${width}px` : 0}>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </Box>
  );
}
