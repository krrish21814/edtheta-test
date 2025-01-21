/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});
//School Methods
export const schoolMethods = {
  create: async (data: any) => {
    const response = await api.post("/schools", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/schools");
    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await api.get(`/schools/${slug}`);
    return response.data;
  },

  update: async (slug: string, data: any) => {
    const response = await api.put(`/schools/${slug}`, data);
    return response.data;
  },

  delete: async (slug: string) => {
    const response = await api.delete(`/schools/${slug}`);
    return response.data;
  },
};

// Subject Methods
export const subjectMethods = {
  create: async (data: any) => {
    const response = await api.post("/subjects", data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/subjects");
    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await api.get(`/subjects/${slug}`);
    return response.data;
  },

  update: async (slug: string, data: any) => {
    const response = await api.put(`/subjects/${slug}`, data);
    return response.data;
  },

  delete: async (slug: string) => {
    const response = await api.delete(`/subjects/${slug}`);
    return response.data;
  },
};

// Class Methods
export const classMethods = {
  create: async (data: any) => {
    const response = await api.post("/classes", data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/classes");
    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await api.get(`/classes/${slug}`);
    return response.data;
  },

  update: async (slug: string, data: any) => {
    const response = await api.put(`/classes/${slug}`, data);
    return response.data;
  },

  delete: async (slug: string) => {
    const response = await api.delete(`/classes/${slug}`);
    return response.data;
  },
};

// Section Methods
export const sectionMethods = {
  create: async (data: any) => {
    const response = await api.post("/sections", data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/sections");
    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await api.get(`/sections/${slug}`);
    return response.data;
  },

  update: async (slug: string, data: any) => {
    const response = await api.put(`/sections/${slug}`, data);
    return response.data;
  },

  delete: async (slug: string) => {
    const response = await api.delete(`/sections/${slug}`);
    return response.data;
  },

  // Additional methods specific to sections
  addStudent: async (sectionSlug: string, studentSlug: string) => {
    const response = await api.post(`/sections/${sectionSlug}/students`, {
      studentSlug,
    });
    return response.data;
  },

  removeStudent: async (sectionSlug: string, studentSlug: string) => {
    const response = await api.delete(
      `/sections/${sectionSlug}/students/${studentSlug}`
    );
    return response.data;
  },

  updateSubjectTeacher: async (
    sectionSlug: string,
    subjectSlug: string,
    teacherSlug: string
  ) => {
    const response = await api.put(
      `/sections/${sectionSlug}/subject-teachers`,
      {
        subjectSlug,
        teacherSlug,
      }
    );
    return response.data;
  },
};
