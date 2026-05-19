import api from "../api/axiosInstance";

export const getPortfolioOverview = async () => {
  const res = await api.get("/analytics/customer/portfolio/overview");
  return res.data.data;
};

export const getPerformance = async () => {
  const res = await api.get("/analytics/customer/metals/performance");
  return res.data.data;
};

export const getMonthlyTrends = async () => {
  const res = await api.get("/analytics/customer/monthly-trends");
  return res.data.data;
};

export const getPortfolioAllocation = async () => {
  const res = await api.get("/analytics/customer/allocation");
  return res.data.data;
};

export const getInvestmentMetrics = async () => {
  const res = await api.get("/analytics/customer/investment-metrics");
  return res.data.data;
};

export const getMetalRankings = async () => {
  const res = await api.get("/analytics/customer/metal-rankings");
  return res.data.data;
};

export const getAIInsights = async () => {
  const res = await api.get("/analytics/customer/ai-insights");
  return res.data.data;
};