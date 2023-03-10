import { useAuth } from "@/store/auth";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "@/apps/auth/layouts";
import AuthLoginPage from "@/apps/auth/views/Login";

import StudentLayout from "@/apps/student/layouts";
import StudentHomePage from "@/apps/student/views/Home";
import StudentRegisPage from "@/apps/student/views/Regis";

import TeacherLayout from "@/apps/teacher/layouts";
import TeacherHomePage from "@/apps/teacher/views/Home";
import TeacherStudentPage from "@/apps/teacher/views/Student";

export default function App() {
  const role = useAuth((state) => state.role);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<AuthLoginPage />} />
        </Route>

        {role === "student" && (
          <Route element={<StudentLayout />}>
            <Route path="/" element={<StudentHomePage />} />
            <Route path="/registration" element={<StudentRegisPage />} />
          </Route>
        )}

        {role === "teacher" && (
          <Route element={<TeacherLayout />}>
            <Route path="/" element={<TeacherHomePage />} />
            <Route path="/student" element={<TeacherStudentPage />} />
          </Route>
        )}

        {role ? (
          <Route path="*" element={<Navigate to="/" />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}
