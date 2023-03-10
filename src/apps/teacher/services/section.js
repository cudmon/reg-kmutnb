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

    return 200;
  } catch (e) {
    if (e.response.status === 403) {
      return 403;
    }
  }
};

export const createSection = async (data) => {
  const token = useAuth.getState().token;

  try {
    return await http(token).post("/sections", data);
  } catch {
    return false;
  }
};

export const updateSection = async (id, data) => {
  const token = useAuth.getState().token;

  try {
    return await http(token).patch(`/sections/${id}`, data);
  } catch (e) {
    if (e.response.status === 403) {
      return 403;
    }

    return false;
  }
};
