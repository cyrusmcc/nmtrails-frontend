<template>
  <div class="container">
    <router-link to="/" class="nmtrail-title">nmtrails</router-link>
    <img src="../assets/imgs/nm-trail.svg" alt="nmtrail-icon" />

    <div class="card">
      <Form @submit="handlePasswordResetRequest" :validation-schema="schema">
        <p class="form-title">Reset password</p>

        <div class="form-in">
          <label for="email" class="form-label">Enter your Email</label>
          <Field name="email" class="form-control" type="email" />
          <ErrorMessage name="email" class="error-feedback" />
        </div>

        <div class="form-submit">
          <button class="button" id="resetButton">Reset password</button>
        </div>

        <div>
          <div v-if="loading" class="alert" role="alert">
            One moment please...
          </div>
          <div v-if="message" class="alert" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>

    <div id="pageLinks">
      <div class="pageLink">
        <span>Return to </span>
        <router-link to="/login">Log in</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import SettingService from "@/services/setting.service";

export default {
  name: "ForgotPassword",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("You must provide a valid email"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handlePasswordResetRequest(values) {
      this.message = "";
      this.loading = true;
      SettingService.requestForgottenPasswordReset(values).then(
        (data) => {
          this.loading = false;
          this.message = data.message;
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>
<style scoped lang="scss">
img {
  max-height: auto;
  width: 7.5rem;
  margin: 0 auto 15px auto;
}
Form {
  height: 100%;
}
fieldset {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.card {
  text-align: center;
  padding: 15px;
  border-radius: 4px;
  box-shadow: $shadow;
  margin: 10px;
}
.container {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin-top: 25px;
}
.alert {
  margin-top: 5px;
}
#resetButton {
  margin-bottom: 5px;
  width: 100%;
  align-self: flex-start;
}
#pageLinks {
  align-self: center;
  display: flex;
  row-gap: 15px;
  flex-direction: column;
}
.pageLink {
  font-size: 0.85rem;
  color: $primaryDark;
  column-gap: 6px;
}
.pageLink a {
  color: $highlightOne;
}
</style>