<template>
  <div class="container">
    <img src="../assets/imgs/nm-trail.svg" alt="nmtrail-icon" />

    <div class="card" id="loginCard">
      <Form @submit="handleLogin" :validation-schema="schema">
        <p class="form-title">Sign in</p>
        <s v-if="$route.params.loginFlash"> {{ $route.params.loginFlash }}</s>

        <div class="form-in">
          <label for="username" class="form-label">Username</label>
          <Field name="username" class="form-control" type="username" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>

        <div class="form-in">
          <label class="form-label" for="password">Password</label>
          <Field name="password" class="form-control" type="password" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-submit">
          <button class="login-button" id="loginButton">
            Log in
          </button>
        </div>

        <div>
          <div v-if="message" class="alert" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>

    <div id="loginPageLinks">
      <div class="loginPageLink">
        <span>Don't have an account yet? </span>
        <router-link to="/register"> Register one here </router-link>
      </div>

      <div class="loginPageLink">
        <span>Forgot your password? </span>
        <router-link to="/forgot-password"> Reset it here </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!").min(8).max(256),
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
      this.$router.push("/p/" + this.$store.state.auth.user.username);
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/p/" + user.username);
        },
        (/*error*/) => {
          this.loading = false;
          this.message = "Invalid credentials";
          /*
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            */
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
  margin: 0 auto 0 auto;
}
Form {
  height: 100%;
  width: 100%;
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
}
.container {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
.alert {
  margin-top: 5px;
}
#loginButton {
  margin-bottom: 5px;
  width: 100%;
  align-self: flex-start;
}
#loginPageLinks {
  align-self: center;
  text-align: center;
  display: flex;
  row-gap: 15px;
  flex-direction: column;
}
.loginPageLink {
  font-size: 0.85rem;
  color: $primaryDark;
  column-gap: 6px;
}
.loginPageLink a {
  color: $highlightOne;
}
.login-button {
  background-color: $primaryDark;
  color: $primaryLight;
  border-radius: 10px;
  font-size: 1rem;
  border: thin solid $primaryDark;
  line-height: 2rem;
  margin-bottom: 20px;
  padding: 0 3px 0 3px;
  width: fit-content;
  cursor: pointer;
  box-shadow: $shadowLight;
}
</style>