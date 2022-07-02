import { getToken } from "@/setup/api";

export default {
  user: null,
  logged: !!getToken(),
};
