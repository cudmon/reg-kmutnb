import { useEffect, useState } from "react";
import { studentTheme } from "../../../theme";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";

import { StudentDrawer } from "./StudentDrawer";
import { StudentNavbar } from "./StudentNavbar";
import { StudentOutlet } from "./StudentOutlet";

const drawer = {
  width: 275,
};

export function StudentLayout() {
  const mobile = useMediaQuery("(max-width:1200px)");
  const [opened, setOpened] = useState(!mobile);

  useEffect(() => {
    mobile ? setOpened(false) : setOpened(true);
  }, [mobile]);

  const toggle = () => {
    setOpened(!opened);
  };

  return (
    <ThemeProvider theme={studentTheme}>
      <CssBaseline />
      <StudentNavbar name="Tonsak" toggle={toggle} />
      <StudentDrawer
        opened={opened}
        toggle={toggle}
        width={drawer.width}
        mobile={mobile}
      />
      <StudentOutlet opened={opened} width={drawer.width} mobile={mobile} />
    </ThemeProvider>
  );
}
