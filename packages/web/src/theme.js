import { createTheme } from "@mui/material";
import { blue, grey, indigo, teal } from "@mui/material/colors";

const MODE = "light";

const theme = {
  typography: {
    fontFamily: "Kanit",
    fontWeightRegular: 500,
    fontWeightBold: 700,
    fontWeightLight: 400,
    fontWeightMedium: 600,
  },
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
};

export const studentTheme = createTheme({
  palette: {
    primary: indigo,
    secondary: grey,
    mode: MODE,
  },
  ...theme,
});

export const teacherTheme = createTheme({
  palette: {
    primary: teal,
    secondary: grey,
    mode: MODE,
  },
  ...theme,
});

export const loginTheme = createTheme({
  palette: {
    primary: blue,
    secondary: grey,
    mode: MODE,
  },
  ...theme,
});
