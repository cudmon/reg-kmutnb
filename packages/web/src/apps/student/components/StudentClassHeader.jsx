import { Stack, Typography } from "@mui/material";

import { StudentAddSection } from "./StudentAddSection";

export function StudentClassHeader() {
  return (
    <Stack
      mb={3}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography fontWeight={500} variant="h5">
        ผลการลงทะเบียน
      </Typography>
      <StudentAddSection />
    </Stack>
  );
}
