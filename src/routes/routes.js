import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Notifications from "@/pages/Notifications.vue";
import Users from "../pages/admin/users/View.vue";
import AddUser from "../pages/admin/users/AddUser.vue";
import EditUser from "../pages/admin/users/EditUser.vue";
import Products from "../pages/admin/products/View.vue";
import AddProduct from "../pages/admin/products/AddProduct.vue";
import EditProduct from "../pages/admin/products/EditProduct.vue";
import Categories from "../pages/admin/categories/View.vue";
import AddCategory from "../pages/admin/categories/AddCategory.vue";
import EditCategory from "../pages/admin/categories/EditCategory.vue";
const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },

      {
        path: "typography",
        name: "Typography",
        component: Typography,
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons,
      },

      {
        path: "notifications",
        name: "Notifications",
        component: Notifications,
      },
      {
        path: "users",
        name: "Users",
        component: Users,
      },
      {
        path: "/users/add-user",
        name: "AddUser",
        component: AddUser,
      },
      {
        path: "/users/:id/edit-user",
        name: "EditUser",
        component: EditUser,
      },
      {
        path: "products",
        name: "Products",
        component: Products,
      },
      {
        path: "/products/add-product",
        name: "AddProduct",
        component: AddProduct,
      },
      {
        path: "/products/:id/edit-product",
        name: "EditProduct",
        component: EditProduct,
      },
      {
        path: "categories",
        name: "Categories",
        component: Categories,
      },
      {
        path: "/categories/add-category",
        name: "AddCategory",
        component: AddCategory,
      },
      {
        path: "/categories/:id/edit-category",
        name: "EditCategory",
        component: EditCategory,
      },
    ],
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login,
  //   meta: {
  //     requiresGuest: true
  //   }
  // },
];

export default routes;
