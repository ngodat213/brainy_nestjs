import { Request } from 'express';

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Trích xuất tham số phân trang từ request
 * @param req Express Request
 * @param defaultLimit Giới hạn mặc định
 * @param defaultSortBy Trường sắp xếp mặc định
 * @param defaultSortOrder Thứ tự sắp xếp mặc định
 * @returns PaginationParams
 */
export function extractPaginationParams(
  req: Request,
  defaultLimit = 10,
  defaultSortBy = 'createdAt',
  defaultSortOrder: 'asc' | 'desc' = 'desc',
): PaginationParams {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || defaultLimit;
  const sortBy = (req.query.sortBy as string) || defaultSortBy;
  const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || defaultSortOrder;

  return {
    page: Math.max(1, page), // Page không thể nhỏ hơn 1
    limit: Math.max(1, Math.min(limit, 100)), // Limit từ 1-100
    sortBy,
    sortOrder,
  };
}

/**
 * Tạo đối tượng response phân trang
 * @param data Dữ liệu trang hiện tại
 * @param total Tổng số item
 * @param params Tham số phân trang
 * @returns PaginatedResponse
 */
export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  params: PaginationParams,
): PaginatedResponse<T> {
  const { page, limit } = params;
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
} 