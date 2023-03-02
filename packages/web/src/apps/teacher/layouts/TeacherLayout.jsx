import { useEffect, useState } from "react";
import { teacherTheme } from "../../../theme";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";

import { TeacherDrawer } from "./TeacherDrawer";
import { TeacherNavbar } from "./TeacherNavbar";
import { TeacherOutlet } from "./TeacherOutlet";

const drawer = {
  width: 275,
};

export function TeacherLayout() {
  const mobile = useMediaQuery("(max-width:1200px)");
  const [opened, setOpened] = useState(!mobile);

  useEffect(() => {
    mobile ? setOpened(false) : setOpened(true);
  }, [mobile]);

  const toggle = () => {
    setOpened(!opened);
  };

  return (
    <ThemeProvider theme={teacherTheme}>
      <CssBaseline />
      <TeacherNavbar name="ENS" toggle={toggle} />
      <TeacherDrawer
        opened={opened}
        toggle={toggle}
        width={drawer.width}
        mobile={mobile}
      />
      <TeacherOutlet opened={opened} width={drawer.width} mobile={mobile} />
    </ThemeProvider>
  );
}
