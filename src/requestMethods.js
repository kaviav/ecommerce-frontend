import axios from "axios";

const BASE_URL = "http://localhost:5000/";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTkyYTg3MDMxMzVlNDc3YjU1ODEwOSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2OTY4MzIzMDgsImV4cCI6MTY5NzA5MTUwOH0.AP2KLogv6HTvr7neG-mP_DjsNU0fS7tXDajWowOHWiQ";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// console.log(user);
const currentUser = user && JSON.parse(user)?.currentUser;
// console.log(currentUser);
const token = currentUser?.accessToken;
// console.log(token);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${token}` },
});
