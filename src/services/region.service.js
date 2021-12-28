import api from "./http-commons";

const REGION_URL = process.env.VUE_APP_BACKEND_URL + "/regions";


class RegionService {
  getFeaturedRegion() {
    return api
      .get(REGION_URL + "/featured")
      .then((response) => {
        return response.data;
      })
  }
  getFeaturedRegionTrails(id) {
    return api
      .get(REGION_URL + "/" + id + "/trails")
      .then((response) => {
        return response.data;
      });
  }
}

export default new RegionService();
