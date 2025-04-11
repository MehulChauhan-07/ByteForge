import axios from "axios";

const API_URL = "http://localhost:8080/api/dashboard/";

class DashboardService {
  getUserProgress() {
    return axios.get(API_URL + "progress");
  }

  getRecommendedCourses() {
    return axios.get(API_URL + "recommendations");
  }

  getRecentActivity() {
    return axios.get(API_URL + "activity");
  }
}

export default new DashboardService();
