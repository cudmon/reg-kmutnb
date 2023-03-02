import { useAuthStore } from "../../../store/auth";
import { Menu, AccountCircle } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

export function StudentNavbar({ toggle }) {
  const name = useAuthStore((state) => state.name);

  return (
    <AppBar
      enableColorOnDark
      position="sticky"
      color="primary"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          sx={{ mr: 2 }}
          color="inherit"
          onClick={toggle}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ระบบลงทะเบียนเรียน
        </Typography>
        <IconButton size="large" color="inherit" sx={{ mr: 1 }}>
          <AccountCircle />
        </IconButton>
        <Typography fontWeight={500}>{name}</Typography>
      </Toolbar>
    </AppBar>
  );
}
