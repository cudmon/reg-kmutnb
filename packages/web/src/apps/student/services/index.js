import { http } from "@/plugins/http";
import { useAuth } from "@/store/auth";

export const withdraw = async (id) => {
  const token = useAuth.getState().token;

  try {
    return await http(token).post("/registration/withdraw", {
      section_id: id,
    });
  } catch {
    return false;
  }
};

export const regis = async (subject, section) => {
  const token = useAuth.getState().token;

  try {
    return await http(token).post("/registration/regis", {
      subject_code: subject,
      section_number: section,
    });
  } catch {
    return false;
  }
};

export const change = async (subject, section) => {
  const token = useAuth.getState().token;

  try {
    return await http(token).post("/registration/change", {
      subject_id: subject,
      section_number: section,
    });
  } catch {
    return false;
  }
};

export const getRegistration = async () => {
  const token = useAuth.getState().token;

  try {
    const { data } = await http(token).get("/registration", {});

    return data;
  } catch {
    return false;
  }
};

export const getSections = async () => {
  const token = useAuth.getState().token;

  try {
    const { data } = await http(token).get("/sections", {});

    return data;
  } catch {
    return false;
  }
};

export const getSubjects = async () => {
  const token = useAuth.getState().token;

  try {
    const { data } = await http(token).get("/subjects", {});

    return data;
  } catch {
    return false;
  }
};
