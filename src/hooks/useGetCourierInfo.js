import { useGetUsersQuery } from "../store";

export const useGetCourierInfo = (courierId) => {
  const { data } = useGetUsersQuery();

  return data?.data?.find((item) => item.codeid === +courierId);
};
