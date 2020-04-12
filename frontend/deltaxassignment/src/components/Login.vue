<template>
  <div class="login">
    <h2>Login</h2>
    <form v-on:submit="login">
      <input type="text" placeholder="Enter EmailID" name="email" required />
      <br />
      <input
        type="password"
        placeholder="Enter your Password"
        name="password"
        required
      />
      <br />
      <input type="submit" value="Register" />
    </form>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";
export default {
  name: "login",
  methods: {
    login: e => {
      e.preventDefault();
      let email = e.target.elements.email.value;
      let password = e.target.elements.password.value;
      let login = () => {
        let data = {
          email: email,
          password: password
        };

        axios
          .post("login", data)
          .then(response => {
            console.log("Successfully Logged In");
            router.push("/home");
          })
          .catch(errors => {
            console.log("Cannot Log In");
          });
      };
      login();
    }
  }
};
</script>
