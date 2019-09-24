<template>
  <div class="backg">
    <loading v-show="loading"></loading>

    <div style="margin-top:65px">
      <!--        <div class="alertlogin" v-if="error">
            <span>invalid username/password or your DILo account hasn't been registered to this web</span>
      </div>-->
      <error-flash v-bind:error="error" v-bind:success="success" v-bind:err_msg="err_msg" />

      <div class="contain" v-bind:class="{ active: isActive }">
        <div class="card"></div>
        <div class="card">
          <notifications group="first" position="top center" />
          <notifications group="second" position="top center" />
          <div>
            <h3 style="color: #797979;font-weight: 900;margin-bottom: 50px;margin-left: 57px;">
              MIKTI
              <span class="innovlbl">Start</span>
            </h3>
          </div>
          <div>
            <h1 class="title">Login</h1>
            <div class="input-contain">
              <input
                id="usrnm"
                type="text"
                ref="usrnmref"
                v-model="credential.username"
                required="required"
                v-on:keyup.enter="nextClick()"
              />
              <label>Username</label>
              <div class="bar"></div>
            </div>
          </div>

          <div class="footer">
            <router-link to="/signup">
              <i style="color:#96cc62" class="fa fa-edit"></i> Daftar
            </router-link>
            <!--            <span style="color:#848484;font-weight: 900;padding: 0px 10px;">|</span> -->
            <!--            <a href="http://dilo.id/login-dilo?view=reset"><i style="color:#96cc62" class="fa fa-key"></i> lupa your password?</a>-->
            <span>
              <a href="/v2/#/login">Try New &beta; BETA</a>
            </span>
          </div>
        </div>
        <div class="card alt">
          <div class="toggle" v-on:click="nextClick()"></div>
          <h3 class="title">
            Kata Kunci
            <div class="close" v-on:click="isActive = !isActive"></div>
          </h3>
          <div class="input-contain">
            <input
              id="passd"
              ref="passref"
              type="password"
              v-model="credential.password"
              required="required"
              v-on:keyup.enter="submit()"
            />
            <label>Password</label>
            <div class="bar"></div>
          </div>
          <div class="button-contain">
            <button @click="submit()">
              <span>submit</span>
            </button>
            <button class="fpasswd">
              <router-link class="wpasswd" :to="'/reset-password'">
                <i class="fa fa-unlock"></i> Lupa Password
              </router-link>
            </button>
          </div>
        </div>
      </div>
      <!--
      <div style="text-align: center;font-size: 12px;">
                Technical problem contact : support@bekup.web.id</br>
                <a href="https://wa.me/6281319420262" target="_blank"><i class="fa fa-whatsapp "> Chat Support (081319420262) </i></a>
      </div>
      -->
    </div>

    <activate-modal v-if="activate" @close="activate = false"></activate-modal>
  </div>
</template>

<script>
import httpcontrol from "@/httpcontrol";
import ErrorFlash from "../../errorflash";
import Loading from "@/components/loading";
import activateModal from "./activate";

export default {
  data: function() {
    return {
      credential: {
        username: "",
        password: ""
      },
      error: false,
      activate: this.$route.query.activate,
      user: "",
      isActive: false,
      success: false,
      err_msg: "",
      loading: false
    };
  },
  components: {
    "error-flash": ErrorFlash,
    loading: Loading,
    "activate-modal": activateModal
  },
  methods: {
    nextClick: function() {
      if (this.credential.username === "") {
        this.$notify({
          group: "first",
          title: "Username kosong",
          text:
            "Mohon untuk mengisi username untuk melanjutkan ke tahap berikutnya",
          type: "warn"
        });
        this.isActive = false;
      } else {
        this.isActive = true;
        $("#usrnm").blur();
      }
    },
    submit: function() {
      var credentials = {
        username: this.credential.username,
        password: this.credential.password
      };
      if (this.credential.password === "") {
        this.$notify({
          group: "second",
          title: "Password kosong",
          text: "Mohon untuk mengisi password untuk login",
          type: "warn"
        });
        this.isActive = true;
      } else {
        httpcontrol.login(this, "/login/talent", credentials, "Talent");
      }
    }
  }
};
</script>

<style scoped>
/*
body.skin-blue.sidebar-mini.pace-done {
    background: #e9e9e9 url(/img/login-bg.png) center !important;
}
*/
.wpasswd {
  color: #fff !important;
}
.fpasswd {
  background: none !important;
  border-color: transparent !important;
  text-transform: inherit !important;
}
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}
.innovlbl {
  background: #8bc751;
  color: #fff;
  border-radius: 20px;
  font-weight: 400;
  font-size: 16px;
  padding: 3px 15px 3px 15px;
  position: relative;
  bottom: 2px;
  left: 5px;
}
.alertlogin {
  background: #f95b5b;
  color: #fff;
  padding: 16px;
  border-left-style: solid;
  border-left-color: #ea2121;
  width: 218px;
  margin: 0 auto;
  margin-bottom: 20px;
  text-align: center;
  border-left-width: 4px;
}
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}
.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
@import "/css/loginadmin.css";
@import "https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900|RobotoDraft:400,100,300,500,700,900";
@import "//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css";
/*    @import '/css/bootstrap.min.css';*/
</style>