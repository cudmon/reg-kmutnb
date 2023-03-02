import { CssBaseline } from "@mui/material";
import { useAuthStore } from "./store/auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "./apps/auth/views/LoginPage";

import { StudentLayout } from "./apps/student/layouts/StudentLayout";
import { StudentHomePage } from "./apps/student/views/StudentHomePage";

import { TeacherLayout } from "./apps/teacher/layouts/TeacherLayout";
import { TeacherHomePage } from "./apps/teacher/views/TeacherHomePage";
import { TeacherStudentPage } from "./apps/teacher/views/TeacherStudentPage";

export default function App() {
  const role = useAuthStore((state) => state.role);

  return (
    <CssBaseline>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {role === "student" ? (
            <Route element={<StudentLayout />}>
              <Route path="/" element={<StudentHomePage />} />
            </Route>
          ) : null}
          {role === "teacher" ? (
            <Route element={<TeacherLayout />}>
              <Route path="/" element={<TeacherHomePage />} />
              <Route path="/student" element={<TeacherStudentPage />} />
            </Route>
          ) : null}
          {role ? (
            <Route path="*" element={<Navigate to="/" />} />
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </BrowserRouter>
    </CssBaseline>
  );
}
