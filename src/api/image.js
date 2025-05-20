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
  videoUpload: async ({ video, onProgress, folder }) => {
    const formData = new FormData();
    formData.append("video", video);

    const response = await api.post(`/upload/video/${folder}`, formData, {
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
  fileUpload: async ({ file, onProgress, folder }) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(`/upload/file/${folder}`, formData, {
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
