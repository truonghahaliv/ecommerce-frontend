import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue"; // Ensure this path is correct
import routes from "./routes/routes"; // Ensure this path is correct
// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";
import MaterialDashboard from "./material-dashboard";
import Chartist from "chartist";
import axios from "axios";
import "vue2-toast/lib/toast.css";

// Use Vue Router
Vue.use(VueRouter);

// Create the router instance
const router = new VueRouter({
  routes,
  linkExactActiveClass: "nav-item active",
});

// function isLoggedIn() {
//   return !!localStorage.getItem('authToken');
// }
// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
//   const isAuthenticated = isLoggedIn();

//   if (requiresAuth && !isAuthenticated) {
//     next({ path: '/login', query: { redirect: to.fullPath } });
//   } else if (requiresGuest && isAuthenticated) {
//     next({ path: '/dashboard' });
//   } else if (to.path === '/notfound') {
//     next();
//   }  else {
//     next();
//   }
// });

// axios.interceptors.request.use(
//   function(config) {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   function(error) {
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   function(response) {
//     return response;
//   },
//   function(error) {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('authToken');
//       router.push({ path: '/login', query: { redirect: router.currentRoute.fullPath } });
//     }
//     return Promise.reject(error);
//   }
// );
Vue.prototype.$Chartist = Chartist;

Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  data: {
    Chartist: Chartist,
  },
});
