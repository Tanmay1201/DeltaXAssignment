<template>
  <modal
    name="addArtist"
    transition="pop-out"
    :width="modalWidth"
    :height="400"
  >
    <div class="box">
      <div class="box-part" id="bp-left">
        <div class="partition" id="partition-register">
          <div class="partition-title">ADD ARTIST</div>
          <div class="partition-form">
            <form autocomplete="false" @submit="submitform()">
              <input
                id="n-name"
                type="text"
                v-model="artistName"
                placeholder="Name"
              />
              <input id="n-date" v-model="date" type="date" />
              <textarea
                id="n-bio"
                v-model="artistBio"
                placeholder="BIO"
              ></textarea>
              <div style="margin-top: 42px"></div>

              <div class="button-set">
                <button id="goto-add-btn" type="submit">Add</button>
                <button id="cancel-btn" @click="closeByEvent()">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="box-part" id="bp-right">
        <div class="box-messages"></div>
      </div>
    </div>
  </modal>
</template>

<script>
import axios from "axios";
const MODAL_WIDTH = 656;

export default {
  name: "addArtist",
  data() {
    return {
      modalWidth: MODAL_WIDTH,
      artistName: "",
      artistBio: "",
      date: null
    };
  },
  methods: {
    submitform: function() {
      var data = {
        artistName: this.artistName,
        artistBio: this.artistBio,
        date: this.date
      };
      axios({
        url: "http://localhost:3000/addArtist",
        method: "POST",
        data: data
      }).then(res => {
        if (res.data.message === "Success") {
          this.closeByEvent();
        } else {
          console.log("Error");
        }
      });
    },
    showModal: function() {
      this.$modal.show("addArtist");
    },
    closeByEvent() {
      this.$modal.hide("addArtist");
    }
  },
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
  }
};
</script>

<style lang="scss">
.box {
  background: white;
  overflow: hidden;
  width: 656px;
  height: 400px;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 0 40px black;
  color: #8b8c8d;
  font-size: 0;
  .box-part {
    display: inline-block;
    position: relative;
    vertical-align: top;
    box-sizing: border-box;
    height: 200%;
    width: 50%;
    &#bp-right {
      background: url("/static/images.png") no-repeat top center;
      border-left: 1px solid #eee;
    }
  }
  .box-messages {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .box-error-message {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    height: 0;
    line-height: 32px;
    padding: 0 12px;
    text-align: center;
    width: 100%;
    font-size: 11px;
    color: white;
    background: #f38181;
  }
  .partition {
    width: 100%;
    height: 100%;
    .partition-title {
      box-sizing: border-box;
      padding: 30px;
      width: 100%;
      text-align: center;
      letter-spacing: 1px;
      font-size: 20px;
      font-weight: 300;
    }
    .partition-form {
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
  input[type="password"],
  input[type="text"],
  input[type="date"],
  textarea {
    display: block;
    box-sizing: border-box;
    margin-bottom: 4px;
    width: 100%;
    font-size: 12px;
    line-height: 2;
    border: 0;
    border-bottom: 1px solid #dddedf;
    padding: 4px 8px;
    font-family: inherit;
    transition: 0.5s all;
    outline: none;
    &#n-bio {
      width: 300px;
      height: 100px;
      border-radius: 4px;
      border: 1px solid #dddedf;
    }
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
    &:hover {
      border-color: mix(#dddedf, black, 90%);
      color: mix(#8b8c8d, black, 80%);
    }
  }
  .large-btn {
    width: 100%;
    background: white;
    span {
      font-weight: 600;
    }
    &:hover {
      color: white !important;
    }
  }
  .button-set {
    margin-bottom: 8px;
  }
  #add-btn,
  #cancel-btn {
    margin-left: 8px;
  }

  .autocomplete-fix {
    position: absolute;
    visibility: hidden;
    overflow: hidden;
    opacity: 0;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
  }
}
.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}
</style>
