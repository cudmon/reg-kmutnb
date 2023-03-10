import { http } from "@/plugins/http";
import { useAuth } from "@/store/auth";

export const getSubjects = async () => {
  const token = useAuth.getState().token;

  try {
    const { data } = await http(token).get("/subjects");

    return data;
  } catch {
    return false;
  }
};
