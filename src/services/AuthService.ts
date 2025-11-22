import AxiosClient from "./axiosClient";

const AuthService = {
  login(data: { username: string; password: string }): Promise<any> {
    return AxiosClient.post("/auth/login", data);
  },

  register(data: {
    fullname: string;
    username: string;
    password: string;
  }): Promise<any> {
    return AxiosClient.post("/auth/register", data);
  },
};

export default AuthService;
