import axios from "axios";

const BASE_URL = "http://localhost:5000/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDk2NzNmYzhjYWE4MGZiNWI3MGRmMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NTk3OTQ5MiwiZXhwIjoxNjk2MjM4NjkyfQ.L-IARmtVyc9NWxvkwQhDY_QoyMige1qJwH5I9KXI7n0";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${token}` },
});
