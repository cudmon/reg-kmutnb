import { createTheme } from "@mui/material";
import { blue, blueGrey, indigo, teal } from "@mui/material/colors";

const MODE = "light";

const theme = {
  typography: {
    fontFamily: "Kanit",
    fontWeightRegular: 400,
    fontWeightBold: 600,
    fontWeightLight: 300,
    fontWeightMedium: 500,
  },
  shape: {
    borderRadius: 5,
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
