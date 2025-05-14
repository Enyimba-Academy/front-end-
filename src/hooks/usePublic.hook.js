import { useQuery } from "@tanstack/react-query";
import { getCourses, getCourseById, getSchools } from "../api/publicService";

export const useCourses = (id) => {
  return useQuery({
    queryKey: ["courses", id],
    queryFn: () => getCourses(id),
    enabled: !!id,
  });
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
