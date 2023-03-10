import { Card, CardContent } from "@mui/material";

export default function LoginContainer({ children }) {
  return (
    <Card elevation={2} sx={{ paddingBottom: 2 }}>
      <CardContent sx={{ paddingInline: 4 }}>{children}</CardContent>
    </Card>
  );
}
