import api from "./api";

export const markLessonCompleted = async (enrollmentId, lessonId) => {
  const response = await api.post("/lesson-progress/mark-completed", {
    enrollmentId,
    lessonId,
  });
  return response.data.data;
};

export const updateWatchTime = async (
  enrollmentId,
  lessonId,
  watchedSeconds
) => {
  const response = await api.post("/lesson-progress/update-watch-time", {
    enrollmentId,
    lessonId,
    watchedSeconds,
  });
  return response.data.data;
};

export const getLessonProgress = async (enrollmentId, lessonId) => {
  const response = await api.get(
    `/lesson-progress/${enrollmentId}/${lessonId}`
  );
  return response.data.data;
};

export const getMyLesson = async (contentId) => {
  const response = await api.get(`/material/${contentId}`);
  return response.data.data;
};
