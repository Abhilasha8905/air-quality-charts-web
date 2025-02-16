import { parse } from "date-fns";

export const parseToDate = (date) => {
  return parse(date, "yyyy-MM-dd", new Date());
};
