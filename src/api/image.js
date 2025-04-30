import api from "./api";

export const imageService = {
  uploadImage: async ({ image, onProgress, folder }) => {
    const formData = new FormData();
    formData.append("image", image);

    const response = await api.post(`/upload/upload/${folder}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          onProgress(progressEvent);
        }
      },
    });
    return response.data;
  },
};
