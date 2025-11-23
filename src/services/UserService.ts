import AxiosClient from "./AxiosClient";

const UserService = {
  getALl(): Promise<any> {
    return AxiosClient.get("/users");
  },
};

export default UserService;
