import api from "./http-commons";

const USER_URL = process.env.VUE_APP_BACKEND_URL + "/user";

class UserService {
  hasTrailInToHikeList(userId, trailId) {
    return api
      .get(USER_URL + "/has-trail-in-to-hike-list", {
        params: {
          userId,
          trailId
        },
      })
      .then((response) => {
        return response.data;
      });
  }
  getUserTrailList(userId, listType) {
    return api
      .get(USER_URL + "/user-trail-list", {
        params: {
          userId,
          listType
        },
      })
      .then((response) => {
        return response.data;
      });
  }
  removeTrailFromUserList(userId, trailId, listType) {
    return api
      .post(USER_URL + "/remove-trail-from-user-list", {
        userId,
        trailId,
        listType
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      });
  }
  addTrailToHikeList(userId, trailId, listType) {
    return api
      .post(USER_URL + "/add-trail-to-hike-list", {
        userId,
        trailId,
        listType
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default new UserService();
