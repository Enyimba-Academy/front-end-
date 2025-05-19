import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { coursesService } from "../../api/admin/coursesService";
import { toast } from "react-toastify";

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: coursesService.createCourse,
    onSuccess: (data) => {
      console.log("Course created successfully:", data);
      toast.success("Course created successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      console.error("Error creating course:", error);
      toast.error("Failed to create course. Please try again.");
    },
  });
};

export const useGetCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: coursesService.getCourses,
  });
};

export const useGetCourseById = (id) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => coursesService.getCourseById(id),
    enabled: !!id,
  });
};

export const useUpdateCourse = (id) => {
  console.log(id);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => coursesService.updateCourse(id, data),
    onSuccess: (data) => {
      console.log("Course updated successfully:", data);
      toast.success("Course updated successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      console.error("Error updating course:", error);
      toast.error("Failed to update course. Please try again.");
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => coursesService.deleteCourse(id),
    onSuccess: (data) => {
      console.log("Course deleted successfully:", data);
      toast.success("Course deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course. Please try again.");
    },
  });
};
