import { useMutation } from "@tanstack/react-query";
import { imageService } from "@/api/image";
import { useState } from "react";
import { toast } from "react-toastify";
export const useUploadImage = () => {
  const [progress, setProgress] = useState(0);

  return {
    ...useMutation({
      mutationFn: ({ file, folder }) =>
        imageService.uploadImage({
          image: file,
          onProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
          folder,
        }),
      onSuccess: (data) => {
        console.log(data);
        setProgress(0); // Reset progress after successful upload
        toast.success("Image uploaded successfully");
      },
      onError: (error) => {
        console.log(error);
        setProgress(0); // Reset progress on error
        toast.error("Failed to upload image");
      },
    }),
    progress,
  };
};
