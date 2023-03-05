import { createTheme } from "@mui/material";
import { blue, blueGrey, indigo, teal } from "@mui/material/colors";

const MODE = "light";

const theme = {
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
  shape: {
    borderRadius: 3,
  },
  typography: {
    fontFamily: "Kanit",
  },
  transitions: {
    duration: {
      shortest: 125,
      shorter: 175,
      short: 225,
      standard: 275,
      complex: 325,
      enteringScreen: 200,
      leavingScreen: 150,
    },
  },
};

export const studentTheme = createTheme({
  palette: {
    primary: indigo,
    secondary: blueGrey,
    mode: MODE,
  },
  ...theme,
});

export const teacherTheme = createTheme({
  palette: {
    primary: teal,
    secondary: blueGrey,
    mode: MODE,
  },
  ...theme,
});

export const loginTheme = createTheme({
  palette: {
    primary: blue,
    secondary: blueGrey,
    mode: MODE,
    background: {
      default: "#f1f5f9",
    },
  },
  ...theme,
});
