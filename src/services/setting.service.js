import api from "./http-commons";

const SETTING_API_URL = process.env.VUE_APP_BACKEND_URL + "/setting";

class SettingService {

  requestForgottenPasswordReset(email) {
    return api
      .post(SETTING_API_URL + "/forgot-password", email)
      .then(response => {
        return response.data;
      })
  };

  validatePasswordResetToken(userId, token) {
    return api
      .post(SETTING_API_URL + "/validate-password-reset-token", {
        userId,
        token
      })
      .then(response => {
        return response.data;
      });
  }

  handlePasswordReset({ password }, userId, token) {
    console.log(password, userId, token);
    return api
      .post(SETTING_API_URL + "/handle-password-reset", {
        password,
        userId,
        token
      })
      .then(response => {
        return response.data;
      });
  };
  handlePasswordChange({ currentPassword }, { newPassword }) {
    return api
      .post(SETTING_API_URL + "/change-password", {
        currentPassword,
        newPassword,
      });
  }
  requestEmailChange({ email }, { password }) {
    //console.log(email, password);
    return api
      .post(SETTING_API_URL + "/email-change-request", {
        email,
        password,
      })
      .then(response => {
        return response.data;
      });
  }
  handleEmailChange(userId, token) {
    console.log(userId, token);
    return api
      .post(SETTING_API_URL + "/handle-email-change", {
        userId,
        token
      })
      .then(response => {
        return response.data;
      });
  }

}
export default new SettingService();
