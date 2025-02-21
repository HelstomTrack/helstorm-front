import Cookies from "js-cookie";

export const setAccessToken = (token: string) => {
    Cookies.set("token", token, { expires: 1 }); // Expire après 1 jour
};

export const getAccessToken = () => {
    return Cookies.get("token");
};

export const removeAccessToken = () => {
    Cookies.remove("token");
};
