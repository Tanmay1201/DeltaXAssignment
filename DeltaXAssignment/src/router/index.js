import Vue from "vue";
import Router from "vue-router";
import register from "@/components/register";
import home from "@/components/home";
import login from "@/components/Login";
import AddSong from "@/components/AddSong";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/register",
      name: "register",
      component: register,
      meta: {
        guest: true
      }
    },
    {
      path: "/",
      name: "login",
      component: login,
      meta: {
        guest: true
      }
    },
    {
      path: "/addSong",
      name: "AddSong",
      component: AddSong
    },
    {
      path: "/home",
      name: "home",
      component: home
      // meta: {
      //   requiresAuth: true
      // }
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (localStorage.getItem("auth_token") == null) {
//       next({ name: "login" });
//     } else {
//       next();
//     }
//   } else if (to.matched.some(record => record.meta.guest)) {
//     if (localStorage.getItem("auth_token")) {
//       next({ name: "home" });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
