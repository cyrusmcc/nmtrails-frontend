<template>
  <div class="container">
    <router-link to="/" class="nmtrail-title">nmtrails</router-link>
    <img src="../assets/imgs/nm-trail.svg" alt="user-icon" />

    <div class="card" id="registerCard">
      <Form @submit="handleRegister" :validation-schema="schema">
        <p class="form-title">Register new account</p>

        <div class="form-in">
          <div id="email-label">
            <label for="email" class="form-label">Email</label>
          </div>
          <Field name="email" class="form-control" type="email" />
          <ErrorMessage name="email" class="error-feedback" />
        </div>

        <div class="form-in">
          <label for="username" class="form-label">Username</label>
          <Field name="username" class="form-control" type="username" autocomplete="on"/>
          <ErrorMessage name="username" class="error-feedback" />
        </div>

        <div class="form-in">
          <label class="form-label" for="password">Password</label>
          <Field name="password" class="form-control" type="password" />
          <ErrorMessage name="password" class="error-feedback" autocomplete="off"/>
        </div>

        <button class="button" id="registerButton">Register</button>

        <div>
          <div v-if="message" class="alert" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>

    <div id="login-link">
      <span>Already have an account?</span>
      <router-link to="/login"> Login </router-link>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3)
        .max(16, "Username cannot be greater than 16 characters long."),
      email: yup.string().email("Email is invalid."),
      password: yup.string().required("Password is required!").min(8).max(256),
    });
    return {
      successful: false,
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
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleRegister(user) {
      this.successful = false;
      this.loading = true;
      this.message = "";
      this.$store.dispatch("auth/register", user, this.email).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/login/register-success");
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
  margin: 10px;
  box-shadow: $shadow;
}
.container {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin-top: 25px;
}
#registerButton {
  margin-bottom: 5px;
  width: 100%;
  align-self: flex-start;
}
#login-link {
  font-size: 0.85rem;
  color: $primaryDark;
  display: flex;
  justify-content: center;
  column-gap: 6px;
}
#login-link a {
  color: $highlightOne;
}
#email-label {
  display: flex;
  align-content: center;
  column-gap: 5px;
}
</style>