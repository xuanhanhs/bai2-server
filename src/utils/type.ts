export type PaginateResult = {
  meta: {
    total: number;
    page: number;
  };
  data: any[];
};
