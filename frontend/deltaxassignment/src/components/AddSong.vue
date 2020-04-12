<template>
  <div class="addSong">
    <addArtist ref="add-artist" />
    <h2>
      Add Song
    </h2>
    <br />
    <form @submit.prevent="formData()">
      Song Name
      <label>
        <input
          type="text"
          placeholder="Enter Song Name"
          v-model="songName"
          name="name"/></label
      ><br />
      Date Of Release
      <input type="date" v-model="songReleaseDate" name="date" />
      <br />Select Artists
      <br />
      <br />
      <multiselect v-model="value" :options="names" :multiple="true">
        <template slot="selection" slot-scope="{ values, search, isOpen }"
          ><span
            class="multiselect__single"
            v-if="values.length &amp;&amp; !isOpen"
            >{{ values.length }} options selected</span
          >
        </template>
      </multiselect>

      <div style="margin-top: 20px; margin-bottom: 15px;">
        <button type="button" @click="showModal()">
          Add Artist
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import addArtist from "../components/modals/addArtist.vue";
import axios from "axios";
import Vue from "vue";
import Multiselect from "vue-multiselect";
Vue.component("multiselect", Multiselect);
export default {
  name: "addSong",
  components: {
    addArtist
  },
  data() {
    return {
      value: [],
      options: [],
      names: [],
      songName: "",
      songReleaseDate: null
    };
  },
  methods: {
    showModal: function() {
      this.$refs["add-artist"].showModal();
    },

    formData: function() {
      var data = {
        songName: this.songName,
        songReleaseDate: this.songReleaseDate,
        artistNames: this.value
      };

      axios({
        url: "http://localhost:3000/newSongData",
        method: "POST",
        data: data
      }).then(res => {
        if (res.data.message === "Success") {
          this.$router.push("/home");
        } else {
          console.log("Error");
        }
      });
    },

    addSong: function() {
      axios({
        url: "http://localhost:3000/getArtistName",
        method: "POST"
      }).then(res => {
        this.options = res.data;
        for (let i = 0; i < this.options.length; i++) {
          this.names.push(this.options[i].name);
        }
      });
    }
  },

  beforeMount() {
    this.addSong();
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
input[type="file"] input[type="input"],
input[type="text"],
input[type="date"],
textarea {
  display: block;
  box-sizing: border-box;
  margin-bottom: 4px;
  width: 60%;
  font-size: 12px;
  line-height: 2;
  border: 0;
  border-bottom: 1px solid #dddedf;
  padding: 4px 8px;
  font-family: inherit;
  transition: 0.5s all;
  outline: none;
}

.addSong {
  width: 500px;
  margin: 0 auto;
}

.addSong input {
  width: 100%;
}

.addSong input[type="file"] {
  width: 100%;
  clear: both;
}
button {
  background: white;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  letter-spacing: 1px;
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  min-width: 140px;
  margin-top: 8px;
  color: #8b8c8d;
  cursor: pointer;
  border: 1px solid #dddedf;
  text-transform: uppercase;
  transition: 0.1s all;
  font-size: 10px;
  outline: none;
}

.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
