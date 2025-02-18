export interface PaginatedResponse<T> {
  data: T;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalSchools: number;
    pageSize: number;
  };
}
