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
import NotFound from "../pages/Notfound.vue";

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
        component: Users,
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            name: "Users",
            component: Users,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "add-user",
            name: "AddUser",
            component: AddUser,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: ":id/edit-user",
            name: "EditUser",
            component: EditUser,
            meta: {
              requiresAuth: true,
            },
          },
        ],
      },
      {
        path: "products",
        component: Products,
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            name: "Products",
            component: Products,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "add-product",
            name: "AddProduct",
            component: AddProduct,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: ":id/edit-product",
            name: "EditProduct",
            component: EditProduct,
            meta: {
              requiresAuth: true,
            },
          },
        ],
      },
      {
        path: "categories",
        component: Categories,
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            name: "Categories",
            component: Categories,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "add-category",
            name: "AddCategory",
            component: AddCategory,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: ":id/edit-category",
            name: "EditCategory",
            component: EditCategory,
            meta: {
              requiresAuth: true,
            },
          },
        ],
      },
      {
        path: "permissions",
        component: Permissions,
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            name: "Permissions",
            component: Permissions,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "add-permission",
            name: "AddPermission",
            component: AddPermission,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: ":id/edit-permission",
            name: "EditPermission",
            component: EditPermission,
            meta: {
              requiresAuth: true,
            },
          },
        ],
      },
      {
        path: "roles",
        component: Roles,
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: "",
            name: "Roles",
            component: Roles,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "add-role",
            name: "AddRole",
            component: AddRole,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: ":id/edit-role",
            name: "EditRole",
            component: EditRole,
            meta: {
              requiresAuth: true,
            },
          },
        ],
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
