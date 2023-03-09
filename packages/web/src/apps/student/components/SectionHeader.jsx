import SectionRegis from "./SectionRegis";
import { Typography, Stack } from "@mui/material";

export default function SectionHeader() {
  return (
    <Stack
      mb={3}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography fontWeight={500} variant="h5">
        ลงทะเบียน
      </Typography>
      <SectionRegis />
    </Stack>
  );
}
