import { http } from "@/plugins/http";
import { useAuth } from "@/store/auth";

export const getStudents = async () => {
  const token = useAuth.getState().token;

  try {
    const { data } = await http(token).get("/students");

    return data;
  } catch {
    return false;
  }
};

export const deleteStudent = async (id) => {
  const token = useAuth.getState().token;

  try {
    await http(token).delete(`/students/${id}`);

    return 200;
  } catch (e) {
    return false;
  }
};

export const createStudent = async (data) => {
  const token = useAuth.getState().token;

  try {
    return await http(token).post("/students", data);
  } catch {
    return false;
  }
};

export const updateStudent = async (id, data) => {
  const token = useAuth.getState().token;

  try {
    return await http(token).patch(`/students/${id}`, data);
  } catch {
    return false;
  }
};
