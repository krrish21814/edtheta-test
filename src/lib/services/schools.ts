import { School } from "@/types/school";
import api, { handleApiResponse } from "../api/client";
import { ApiResponse } from "../api/response";
import { PaginatedResponse } from "@/types/paginated-response";

export const schoolMethods = {
  create: async (data: FormData): Promise<ApiResponse<School>> => {
    return handleApiResponse(
      api.post("/schools", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  },

  getNearby: async (
    latitude: number,
    longitude: number,
    radius: number,
    options?: {
      page?: number;
      limit?: number;
      amenities?: string[];
      minRating?: number;
      board?: string;
    }
  ): Promise<ApiResponse<PaginatedResponse<School[]>>> => {
    const queryParams = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      radius: radius.toString(),
      page: (options?.page || 1).toString(),
      limit: (options?.limit || 10).toString(),
    });

    if (options?.amenities?.length) {
      queryParams.set("amenities", options.amenities.join(","));
    }

    if (options?.minRating !== undefined) {
      queryParams.set("minRating", options.minRating.toString());
    }

    if (options?.board) {
      queryParams.set("board", options.board);
    }

    return handleApiResponse(
      api.get(`/schools/nearby?${queryParams.toString()}`)
    );
  },

  getBySlug: async (slug: string): Promise<ApiResponse<School>> => {
    return handleApiResponse(api.get(`/schools/${slug}`));
  },

  update: async (slug: string, data: School): Promise<ApiResponse<School>> => {
    return handleApiResponse(api.put(`/schools/${slug}`, data));
  },

  delete: async (slug: string): Promise<ApiResponse<School>> => {
    return handleApiResponse(api.delete(`/schools/${slug}`));
  },

  getFacultyStats: async (slug: string): Promise<ApiResponse<School>> => {
    return handleApiResponse(api.get(`/schools/${slug}/faculty-stats`));
  },
};
