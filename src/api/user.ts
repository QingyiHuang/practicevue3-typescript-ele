import http from "./httpinstance";
interface IloginParam {
  username: string;
  password: string;
}
const login = (data: IloginParam) => {
  return http.post("/api/user/login", {
    data,
  });
};
const loginErr = (data: IloginParam) => {
  return http.post("/api/user/login1", {
    data,
  });
};
const getUserDetail = () => {
  return http.post("/api/user/getDetail", {
    // headers: {
    //   Authorization: window.localStorage.getItem("token") ?? "",
    // },
  });
};
const test = () => {
  return http.get("api/user/setting");
};
export default {
  login,
  loginErr,
  test,
  getUserDetail,
};
