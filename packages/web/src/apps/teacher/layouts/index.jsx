import { teacherTheme } from "@/theme";
import { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";

import Drawer from "./Drawer";
import Navbar from "./Navbar";
import Outlet from "./Outlet";

const drawerWidth = 275;

export default function TeacherLayout() {
  const isMobile = useMediaQuery("(max-width:1200px)");
  const [isOpened, setIsOpened] = useState(!isMobile);

  useEffect(() => {
    isMobile ? setIsOpened(false) : setIsOpened(true);
  }, [isMobile]);

  const toggle = () => {
    setIsOpened(!isOpened);
  };

  return (
    <ThemeProvider theme={teacherTheme}>
      <CssBaseline />
      <Navbar toggle={toggle} />
      <Drawer
        opened={isOpened}
        toggle={toggle}
        width={drawerWidth}
        mobile={isMobile}
      />
      <Outlet opened={isOpened} width={drawerWidth} mobile={isMobile} />
    </ThemeProvider>
  );
}
