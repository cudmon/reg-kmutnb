import { Typography, Stack } from "@mui/material";
import StudentCreate from "../components/StudentCreate";

export default function StudentHeader() {
  return (
    <Stack
      mb={3}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography fontWeight={500} variant="h5">
        นักศึกษา
      </Typography>
      <StudentCreate />
    </Stack>
  );
}
