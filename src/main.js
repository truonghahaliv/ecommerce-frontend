import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue'; // Ensure this path is correct
import routes from './routes/routes'; // Ensure this path is correct
import store from './store/store';
// Plugins
import GlobalComponents from './globalComponents';
import GlobalDirectives from './globalDirectives';
import Notifications from './components/NotificationPlugin';
import MaterialDashboard from './material-dashboard';
import Chartist from 'chartist';

import 'vue2-toast/lib/toast.css';

// Use Vue Router
Vue.use(VueRouter);

// Create the router instance
const router = new VueRouter({
  routes,
  linkExactActiveClass: 'nav-item active',
});

// function isLoggedIn() {
//   return localStorage.getItem('auth') === 'true';
// }
// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else if (to.meta.requiresGuest && store.getters.isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
});
Vue.prototype.$Chartist = Chartist;

Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  data: {
    Chartist: Chartist,
  },
});
