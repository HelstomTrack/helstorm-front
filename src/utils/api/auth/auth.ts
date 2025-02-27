import Cookies from "js-cookie";

export const setAccessToken = (token: string) => {
    Cookies.set("token", token, { expires: 1 });
};

export const setRefreshToken = (refreshToken: string) => {
    localStorage.setItem('refresh_token', refreshToken);
};

export const getRefreshToken = () => {
    return localStorage.getItem('refresh_token');
};
export const getAccessToken = () => {
    return Cookies.get("token");
};

export const removeAccessToken = () => {
    Cookies.remove("token");
    localStorage.removeItem('refresh_token');
};

export const removeTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};