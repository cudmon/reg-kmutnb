import { Typography, Box } from "@mui/material";

export default function LoginTitle() {
  return (
    <>
      <Box marginY={4} textAlign="center">
        <img src="/logo.jpg" alt="Logo" width="70%" />
      </Box>
      <Typography
        color="primary"
        fontSize={40}
        marginBlock={8}
        align="center"
        variant="h4"
      >
        เข้าสู่ระบบ
      </Typography>
    </>
  );
}
