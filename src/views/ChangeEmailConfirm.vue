<template>
  <div class="container">
    <div class="card">
      <div v-if="message" class="alert" role="alert">
        {{ message }}
      </div>
      <router-link class="pageLink" to="/login">Return to login</router-link>
    </div>
  </div>
</template>

<script>
import SettingService from "@/services/setting.service";

export default {
  name: "ChangeEmailConfirmation",
  data() {
    return {
      message: "",
      emailChangeToken: "",
    };
  },
  mounted() {
    SettingService.handleEmailChange(
      this.$route.params.userId,
      this.$route.params.emailToken
    ).then(
      (response) => {
        this.message = response.message;
        this.$store.dispatch("auth/logout", this.currentUser).then(() => {
          this.$router.push("/login/email-change-success");
        });
      },
      (error) => {
        this.message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>

<style style="scoped" lang="scss">
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 5rem;
  padding: 15px;
  margin: 150px auto;
  color: $primaryLight;
}
.alert {
  background: none;
  color: $primaryDark;
}
.pageLink {
  margin-top: 10px;
  font-size: 0.85rem;
  color: $highlightOne;
}
.pageLink a {
  color: $primaryLight;
}
</style>