import axiosInstance from "./http-commons";
import tokenService from "./token.service";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = tokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          //console.log("401 error");
          //this.$router.push("/login");

          try {
            const rs = await axiosInstance.post("/auth/refreshToken", {
              refreshToken: tokenService.getLocalRefreshToken(),
            });

            const { accessToken } = rs.data;

            store.dispatch("auth/refreshToken", accessToken);
            tokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (_error) {
            if (tokenService.getUser()) {
              tokenService.removeUser();
            }

            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;