export const getTotalPagesCount = (total: number = 0, pageSize: number = 1) => {
  return Math.ceil(total / pageSize);
};
