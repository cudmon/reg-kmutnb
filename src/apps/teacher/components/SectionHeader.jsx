import { Typography, Stack } from "@mui/material";
import SectionCreate from "../components/SectionCreate";

export default function SectionHeader() {
  return (
    <Stack
      mb={3}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography fontWeight={500} variant="h5">
        ตอนเรียน
      </Typography>
      <SectionCreate />
    </Stack>
  );
}
