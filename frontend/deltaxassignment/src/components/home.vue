<template>
  <div class="home">
    <div class="topnav">
      <nav class="header nav">
        <a class="logo" href="/home">
          <img alt="Logo of Website" src="../assets/download.png" />
        </a>
        <ul class="menu">
          <button>
            <a href="/home">Home</a>
          </button>
        </ul>
      </nav>
    </div>
    <br />
    <div class="middle">
      <h2>Top 10 Songs</h2>
      <a href="http://localhost:8081/#/addSong">
        <button type="submit">Add Song</button>
      </a>
    </div>
    <br />
    <br />
    <div class="displaySongs">
      <table>
        <thead>
          <tr>
            <th>
              <h3>Song</h3>
            </th>
            <th>
              <h3>Release Date</h3>
            </th>
            <th>
              <h3>Artists</h3>
            </th>
            <th>
              <h3>Rating</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(song) in names">
            <td>{{ song.songInfo.name }}</td>
            <td>{{ song.songInfo.releaseDate }}</td>
            <td>
              <div
                v-for="(number) in song.songInfo.Artists.length"
              >{{ song.songInfo.Artists[number-1] }},</div>
            </td>

            <td>
              <star-rating
                :rating="song.songInfo.songRating"
                :star-size="50"
                @rating-selected="setCurrentSelectedRating(song.songInfo.name)"
                v-model="song.songInfo.songRating"
              ></star-rating>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StarRating from "vue-star-rating";
export default {
  components: {
    StarRating
  },
  data() {
    return {
      names: [],
      currentSelectedRating: 0,
      songSelectedRating: null
    };
  },
  methods: {
    setCurrentSelectedRating: function(song) {
      var data = {
        songRating: this.songSelectedRating,
        songName: song
      };
      axios({
        url: "http://localhost:3000/getSongsWithUsersRating",
        method: "POST",
        data: data
      }).then(res => {
        console.log("Got resonse");
        this.loadSongs();
      });
    },
    loadSongs: function() {
      axios({
        url: "http://localhost:3000/getSongsWithoutUsersRated",
        method: "POST"
      }).then(res => {
        console.log(res.data);
        this.names = res.data;
      });
    }
  },
  beforeMount() {
    this.loadSongs();
  }
};
</script>

  <style scoped>
.nav {
  background-image: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 25);
}

.logo > img {
  height: 100px;
  padding-right: 11px;
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

.displaySongs {
  width: 500px;
  margin: 0 auto;
}

table {
  border-collapse: collapse;
  border: 1px solid black;
}

tr:hover {
  background-color: #f5f5f5;
}

th {
  background-color: #4caf50;
  color: white;
}

th,
td {
  border: 1px solid black;
  padding: 15px;
  text-align: left;
}

button a {
  text-decoration: none;
  cursor: auto;
}
</style>