import { useQuery } from "@tanstack/react-query";
import { getCourses, getCourseById, getSchools } from "../api/publicService";

export const useCourses = () => {
  return useQuery({ queryKey: ["courses"], queryFn: getCourses });
};

export const useCourseById = (id) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
    enabled: !!id,
  });
};

export const useSchools = () => {
  return useQuery({ queryKey: ["schools"], queryFn: getSchools });
};
