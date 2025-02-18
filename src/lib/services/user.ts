import { School } from "@/types/school";
import api, { handleApiResponse } from "../api/client";
import { ApiResponse } from "../api/response";
import { User } from "@/types/user";

export const userMethods = {
  create: async (data: FormData): Promise<ApiResponse<User>> => {
    return handleApiResponse(
      api.post("/users/registration", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  },

  login: async (data: FormData): Promise<ApiResponse<User>> => {
    return handleApiResponse(
      api.post("/users/login", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  },

  verify: async (token: string): Promise<ApiResponse<User>> => {
    return handleApiResponse(
      api.post(
        "/users/verify ",
        { token: token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    );
  },

  getBySlug: async (slug: string): Promise<ApiResponse<School>> => {
    return handleApiResponse(api.get(`/users/${slug}`));
  },

  update: async (slug: string, data: School): Promise<ApiResponse<School>> => {
    return handleApiResponse(api.put(`/schools/${slug}`, data));
  },

  delete: async (slug: string): Promise<ApiResponse<School>> => {
    return handleApiResponse(api.delete(`/schools/${slug}`));
  },
};
