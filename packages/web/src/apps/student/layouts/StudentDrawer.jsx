import { Home, Logout } from "@mui/icons-material";
import { useAuthStore } from "../../../store/auth";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

const links = [
  {
    label: "หน้าหลัก",
    href: "/",
    icon: <Home />,
  },
];

export function StudentDrawer({ opened, mobile, width, toggle }) {
  const { pathname } = useLocation();
  const authStore = useAuthStore((state) => state.update);

  const logout = () => {
    authStore({
      role: null,
      name: null,
      token: null,
    });
  };

  return (
    <Drawer
      onClose={toggle}
      open={opened}
      variant={mobile ? "temporary" : "persistent"}
    >
      <Toolbar />
      <Box sx={{ flexGrow: 1 }} width={width}>
        <List>
          {links.map((link) => (
            <ListItem key={link.href}>
              <ListItemButton
                selected={pathname === link.href}
                component={Link}
                to={link.href}
                sx={{ borderRadius: 1 }}
              >
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <List>
        <Divider variant="middle" />
        <ListItem>
          <ListItemButton sx={{ borderRadius: 1 }} onClick={logout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="ออกจากระบบ" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
