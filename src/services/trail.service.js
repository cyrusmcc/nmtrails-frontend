import api from "./http-commons";

const TRAIL_URL = process.env.VUE_APP_BACKEND_URL + "/trails";

var page = 0;
var pageSorted = 0;
var pageSize = 10;

class TrailService {
  getTrails() {
    return api
      .get(TRAIL_URL + "/", {
        params: {
          page,
          pageSize,
        },
      })
      .then((response) => {
        page++;
        return response.data;
      });
  }
<<<<<<< Updated upstream

=======
  getTrailsByName(name) {
    return api
      .get(TRAIL_URL + "/", {
        params: {
          name,
          pageSorted,
          pageSize,
        },
      })
      .then((response) => {
        pageSorted++;
        return response.data;
      });
  }
>>>>>>> Stashed changes
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
