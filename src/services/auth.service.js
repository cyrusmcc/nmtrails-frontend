import api from "./http-commons";
import TokenService from "./token.service";

const AUTH_API_URL = process.env.VUE_APP_BACKEND_URL + "/auth";

class AuthService {
  login({ username, password }) {
    return api
      .post(AUTH_API_URL + "/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }
  logout() {
    TokenService.removeUser();
  }
  register({ username, email, password }) {
    return api.post(AUTH_API_URL + "/register", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();