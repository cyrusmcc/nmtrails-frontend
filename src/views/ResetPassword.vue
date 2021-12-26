<template>
  <div class="container">
    <router-link to="/" class="nmtrail-title">nmtrails</router-link>
    <div class="card">
      <Form
        @submit="handlePasswordReset"
        :validation-schema="schema"
        :initial-values="formValues"
        v-if="validToken"
      >
        <p class="form-title">Reset password</p>

        <div class="form-in">
          <label for="password" class="form-label">Enter new password</label>
          <Field name="password" class="form-control" type="email" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-submit">
          <button class="button" id="resetButton">Change password</button>
        </div>

        <div>
          <div v-if="message" class="alert" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
      <div v-if="!validToken">
        Password reset token is invalid, submit another
        <router-link to="/forgot-password">reset request.</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import SettingService from "@/services/setting.service";

export default {
  components: { Form, Field, ErrorMessage },
  name: "ResetPassword",
  data() {
    const schema = yup.object().shape({
      password: yup
        .string()
        .required("You must provide a new password")
        .min(8)
        .max(256),
      token: yup.string().required(),
    });
    const formValues = {
      password: "",
      token: this.$route.params.passToken,
    };
    return {
      message: "",
      validToken: false,
      formValues,
      schema,
    };
  },
  created() {
    SettingService.validatePasswordResetToken(
      this.$route.params.userId,
      this.$route.params.passToken
    )
      .then(() => {
        this.validToken = true;
      })
      .catch(() => {
        this.message = "Invalid token";
        console.log(this.message);
      });
  },
  methods: {
    handlePasswordReset(values) {
      SettingService.handlePasswordReset(
        values,
        this.$route.params.userId,
        this.$route.params.passToken
      ).then(
        (response) => {
          this.message = response.message;
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

    /*
    handleResetPassword(values) {
      this.message = "";
      this.$store.dispatch("settings/handlePasswordReset", values).then(
        (data) => {
          this.message = data.message;
          this.$router.push("/login");
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
    */
  },
};
</script>
<style scoped lang="scss">
Form {
  height: 100%;
}
fieldset {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
}
a {
  color: $highlightOne;
}
.card {
  color: $primaryDark;
  text-align: center;
  padding: 15px;
  border-radius: 4px;
  box-shadow: $shadowLight;
  margin: 10px;
}
.container {
  display: flex;
  flex-direction: column;
  align-content: center;
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
  color: $primaryLight;
  column-gap: 6px;
}
.pageLink a {
  color: $highlightOne;
}
</style>