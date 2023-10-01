import axios from "axios";

const BASE_URL = "http://localhost:5000/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTkyYTg3MDMxMzVlNDc3YjU1ODEwOSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2OTYxNDgyMTEsImV4cCI6MTY5NjQwNzQxMX0.frbTWSKpSUTGTo1v5n2MAcJKkGroi9753vnH9CFUox8";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${token}` },
});
