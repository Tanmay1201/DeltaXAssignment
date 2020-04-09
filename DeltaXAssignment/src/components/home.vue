<template>
<div class="home">
    <div class="topnav">
  <nav class="header nav">
    <a class="logo" href="/home">
      <img alt="Logo of Website" src="../assets/download.png" />
    </a>
    <ul class="menu">
      <li><a href="/home">Home</a></li>
      <li><a href="/allSongs">All Songs</a></li>
    </ul>
  </nav>
    </div>
    <br/>
    <div class="middle">
        <h2> Top 10 Songs </h2>
        <a href="/addSongs">
            <input type="submit" value="Add Song">
        </a>
    </div>
    <div class="displaySongs">
        <table>
            <thead>
                <tr>
                    <th>
                        <h3>Song </h3>
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
                    <td>
                        {{ song.songInfo.name }}
                    </td>
                    <td>
                        {{ song.songInfo.releaseDate }}
                    </td>
                    <td>
                        {{ song.songInfo.artists.name}}
                    </td>

                    <td>
                        <star-rating :rating="song.songInfo.songRating" :star-size="50" @rating-selected="setCurrentSelectedRating(song.songInfo.name)" v-model="song.songInfo.songRating"></star-rating>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import axios from "axios";
import StarRating from 'vue-star-rating';
export default {
    components: {
        StarRating
    },
    data()  {
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
                data : data
            }).then(res => {
                console.log("Got resonse")
                this.loadSongs();
                

            })
        },
        loadSongs: function() 
        {
            axios
            ({
                url: "http://localhost:3000/getSongsWithoutUsersRated",
                method: "POST"
            }).then(res => 
            {
                this.names=  res.data
            });
        }
        },
        beforeMount() {
            this.loadSongs()
        }
        
}

</script>

  <style scoped>
    .nav {
      background-image: #fff;
      border-bottom: 1px solid rgba(0, 0, 0, 25);
    }

    ul li {
      display: inline;
    }

    .header .menu {
      clear: both;
      max-height: 0;
      transition: max-height 2s ease-out;
    }

    .header {
      box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
      width: 100%;
      z-index: 3;
    }

    li {
      display: block;
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    }

    .logo > img {
      height: 42px;
      padding-right: 11px;
    }
  </style>
</template>
