<template>
  <div class="addSong">
    <add-artist />
    />
    <h2>
      Add Song
    </h2>
    <form>
      Song Name
      <input type="text" placeholder="Enter Song Name" name="name" /><br />
      Date Released <input type="date" name="date" /><br />
      Artwork
      <label class="custom-file-upload">
        <input type="file" />
        Upload Image
      </label>
      <br />
      Select Artists
      <div>
        <multiselect v-model="value" :options="names" :multiple="true">
          <template slot="selection" slot-scope="{ values, search, isOpen }"
            ><span
              class="multiselect__single"
              v-if="values.length &amp;&amp; !isOpen"
              >{{ values.length }} options selected</span
            >
          </template>
        </multiselect>
      </div>
      <br />
      <div>
        <button class="btn green" @click="showModal = true">
          Add Artists
        </button>
      </div>
      <input type="submit" value="Save" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import addArtist from "../components/addArtist";
import Multiselect from "vue-multiselect";
Vue.component("multiselect", Multiselect);
export default {
  name: "addSong",
  component: {
    addArtist
  },
  data() {
    return {
      showModal: false,
      value: [],
      options: [],
      names: []
    };
  },
  created() {
    setInterval(() => {
      this.canBeShown = !this.canBeShown;
    }, 5000);
  },
  methods: {
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
input[type="file"] {
  display: none;
}

.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
