import api from "./axios"

export const registerUser = (data) => {
    return api.post("/users/register",data);
};

export const loginUser = (data) => {
    return api.post("/users/login",data);
};

export const logoutUser = () => {
    return api.post("/users/logout");
};

export const getCurrentUser = () => {
    return api.get("/users/current-user")
};

export const changePassword = (data) => {
    return api.post("/users/change-password", data);
};