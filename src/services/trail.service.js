import api from "./http-commons";

const TRAIL_URL = process.env.VUE_APP_BACKEND_URL + "/trails";

var page = 0;
var pageSize = 0;

class TrailService {
  getTrails() {
    return api
      .get(TRAIL_URL + "/", {
        headers: {
          page,
          pageSize,
        },
      })
      .then((response) => {
        page++;
        return response.data;
      });
  }

  getTrailById(id) {
    return api
      .get(TRAIL_URL + "/" + id)
      .then((response) => response.data);
  }

  getTrailExtent(ids) {
    return api
      .get(TRAIL_URL + "/extent", { params : {
        "ids": ids.join(',')
      }})
      .then((response) => response.data);
  }
}

export default new TrailService();
