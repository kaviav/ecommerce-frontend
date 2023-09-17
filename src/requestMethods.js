import axios from "axios";

const BASE_URL = "http://localhost:5000/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmJjZWVjMTU3YzA5ZGUzOWIzOTQ3NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NDk0MzE0NCwiZXhwIjoxNjk1MjAyMzQ0fQ.bcDeCtVSq8oZ43hcBYqGsy2DusEuam-RTP0uPvHXuMQ";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${token}` },
});
