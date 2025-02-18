export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export const apiResponse = {
  success<T>(data: T, message: string = "Request successful"): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  },

  error(message: string, error?: string): ApiResponse<null> {
    return {
      success: false,
      message,
      error,
    };
  },
};
