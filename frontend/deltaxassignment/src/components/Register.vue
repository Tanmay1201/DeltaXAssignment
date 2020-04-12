<template>
  <div class="register">
    <h2>Register</h2>
    <form v-on:submit="register" v-on:submit.prevent>
      <input
        v-model="name"
        type="text"
        placeholder="Enter Name"
        name="name"
        required
      />
      <br />
      <input
        v-model="email"
        type="text"
        placeholder="Enter EmailID"
        name="email"
        required
      />
      <br />
      <input
        v-model="password"
        type="password"
        placeholder="Enter your Password"
        name="password"
        required
      />
      <br />
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Enter your confirm Password"
        name="confirmPassword"
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
  name: "register",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      confirmPassword: null
    };
  },
  methods: {
    register: function() {
      var data = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
      axios({
        url: "http://localhost:3000/register",
        method: "POST",
        data: data
      })
        .then(res => {
          console.log("Successfully registered");
          router.push("/");
        })
        .catch(errors => {
          console.log("Cannot Register");
          console.log(errors);
        });
    }
  }
};
</script>
