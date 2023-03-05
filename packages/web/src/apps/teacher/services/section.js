import { http } from "@/plugins/http";
import { useAuth } from "@/store/auth";

export const getSections = async () => {
  const token = useAuth.getState().token;

  try {
    const { data } = await http(token).get("/sections");

    return data;
  } catch {
    return false;
  }
};

export const deleteSection = async (id) => {
  const token = useAuth.getState().token;

  try {
    await http(token).delete(`/sections/${id}`);
  } catch (e) {
    if (e.response.status === 403) {
      return 403;
    }

    return false;
  }
};

export const createSection = async (data) => {
  try {
    return await http.post("/sections", data);
  } catch {
    return false;
  }
};
