export interface Pagination<T> {
  total: number;

  pageSize: number;

  pageNum: number;

  list: T[];
}

export * from "./short-link";
