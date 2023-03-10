import { http } from "@/plugins/http";
import { useAuth } from "@/store/auth";

export const login = async (username, password) => {
  const token = useAuth.getState().token;

  try {
    const { data } = await http(token).post("/auth/login", {
      username,
      password,
    });

    return {
      role: data.role,
      name: data.name,
      token: data.accessToken,
    };
  } catch (e) {
    return {
      error: {
        code: e.response.status,
      },
    };
  }
};
