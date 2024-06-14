import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import Users from "../pages/admin/users/View.vue";
import AddUser from "../pages/admin/users/AddUser.vue";
import EditUser from "../pages/admin/users/EditUser.vue";
import Products from "../pages/admin/products/View.vue";
import AddProduct from "../pages/admin/products/AddProduct.vue";
import EditProduct from "../pages/admin/products/EditProduct.vue";
import Categories from "../pages/admin/categories/View.vue";
import AddCategory from "../pages/admin/categories/AddCategory.vue";
import EditCategory from "../pages/admin/categories/EditCategory.vue";
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";
import Permissions from "../pages/admin/permissions/View.vue";
import AddPermission from "../pages/admin/permissions/AddPermission.vue";
import EditPermission from "../pages/admin/permissions/EditPermission.vue";
import Roles from "../pages/admin/roles/View.vue";
import AddRole from "../pages/admin/roles/AddRole.vue";
import EditRole from "../pages/admin/roles/EditRole.vue";
import NotFound from "../pages/NotFound.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          requiresAuth: true,
        },
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
      {
        path: "permissions",
        component: Permissions,
        name: "Permissions",
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/permissions/add-permission",
        name: "AddPermission",
        component: AddPermission,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/permissions/:id/edit-permission",
        name: "EditPermission",
        component: EditPermission,
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: "roles",
        component: Roles,
        name:"Roles",
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/roles/add-role",
        name: "AddRole",
        component: AddRole,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/roles/:id/edit-role",
        name: "EditRole",
        component: EditRole,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];

export default routes;
