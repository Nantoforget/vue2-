//本地存储token
export const SET_TOKEN = (token) => {
    localStorage.setItem("TOKEN", token);
};
//本地读取token
export const GET_TOKEN = () => {
    return localStorage.getItem("TOKEN");
};
