import axios from "axios";

const BASE_URL = "http://localhost:5000/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDk2NzNmYzhjYWE4MGZiNWI3MGRmMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NjA1NzcyOSwiZXhwIjoxNjk2MzE2OTI5fQ.n3pK6ysLNqLDVz6Md4y9nicz__vYXMns8CGy94UtJ2k";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${token}` },
});
