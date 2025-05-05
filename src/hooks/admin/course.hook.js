import { useMutation } from "@tanstack/react-query";
import { coursesService } from "../../api/admin/coursesService";
import { toast } from "react-toastify";

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: coursesService.createCourse,
    onSuccess: (data) => {
      console.log("Course created successfully:", data);
      toast.success("Course created successfully");
    },
    onError: (error) => {
      console.error("Error creating course:", error);
      toast.error("Failed to create course. Please try again.");
    },
  });
};
