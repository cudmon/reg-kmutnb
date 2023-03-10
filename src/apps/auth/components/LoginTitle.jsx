import { Typography, Box } from "@mui/material";

export default function LoginTitle() {
  return (
    <>
      <Box marginY={4} textAlign="center">
        <img src="/images/Logo.jpg" alt="Logo" width="70%" />
      </Box>
      <Typography
        variant="h4"
        fontSize={40}
        align="center"
        color="primary"
        marginBlock={8}
      >
        เข้าสู่ระบบ
      </Typography>
    </>
  );
}
