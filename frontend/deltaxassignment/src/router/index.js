import Vue from "vue";
import Router from "vue-router";
import home from "@/components/home";
import AddSong from "@/components/AddSong";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/addSong",
      name: "AddSong",
      component: AddSong
    },
    {
      path: "/",
      name: "home",
      component: home
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: "/addSong",
      name: "addSong",
      component: AddSong
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
