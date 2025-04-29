import api from "./api";

export const onboardingService = {
  getOnboarding: async () => {
    const response = await api.get("/onboarding").then((res) => {
      return res.data;
    });
    return response;
  },
  updateOnboarding: async (data) => {
    const response = await api.put("/onboarding", data).then((res) => {
      return res.data;
    });
    return response;
  },
  createOnboarding: async (data) => {
    const response = await api.post("/onboarding", data).then((res) => {
      return res.data;
    });
    return response;
  },
};

export default onboardingService;
