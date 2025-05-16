import axios from "axios";

/**
 *
 * Environment Variables
 * In order to use the ENV, you need to decide which one you want to use by using the process.env.NEXT_PUBLIC_ENV as "PROD", "DEV", or "LOCAL".
 *
 */
const ENV =
  process.env.NEXT_PUBLIC_ENV === "PROD"
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_ENV === "DEV"
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_LOCAL;

/**
 *
 * Axios Instance
 * @Reference URL: https://axios-http.com/docs/intro
 *
 */
const http = axios.create({
  baseURL: ENV,
  timeout: 60000, // 1 minute
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});

export default http;
