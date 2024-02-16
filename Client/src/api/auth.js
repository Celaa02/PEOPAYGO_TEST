import axios from "./axios";


export const signupRequest = (user) => axios.post(`/auth/signup`, user);

export const loginRequest = (user) => axios.post(`/auth/signin`, user);

export const verifyTToken = () => axios.get(`/auth/verifyToken`);