/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ApiResponse } from "./response";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const handleApiResponse = async <T>(
  promise: Promise<any>
): Promise<ApiResponse<T>> => {
  try {
    const response = await promise;
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred",
      error: error.message,
    };
  }
};

export default api;
