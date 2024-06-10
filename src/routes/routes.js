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
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";
import Permissions from "../pages/admin/permissions/View.vue";
import AddPermission from "../pages/admin/permissions/AddPermission.vue";
import EditPermission from "../pages/admin/permissions/EditPermission.vue";
import Roles from "../pages/admin/roles/View.vue";
import AddRole from "../pages/admin/roles/AddRole.vue";
import EditRole from "../pages/admin/roles/EditRole.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
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
        component: Users,
        children: [
          {
            path: "",
            name: "Users",
            component: Users,
          },
          {
            path: "add-user",
            name: "AddUser",
            component: AddUser,
          },
          {
            path: ":id/edit-user",
            name: "EditUser",
            component: EditUser,
          },
        ],
      },
      {
        path: "products",
        component: Products,
        children: [
          {
            path: "",
            name: "Products",
            component: Products,
          },
          {
            path: "add-product",
            name: "AddProduct",
            component: AddProduct,
          },
          {
            path: ":id/edit-product",
            name: "EditProduct",
            component: EditProduct,
          },
        ],
      },
      {
        path: "categories",
        component: Categories,
        children: [
          {
            path: "",
            name: "Categories",
            component: Categories,
          },
          {
            path: "add-category",
            name: "AddCategory",
            component: AddCategory,
          },
          {
            path: ":id/edit-category",
            name: "EditCategory",
            component: EditCategory,
          },
        ],
      },
      {
        path: "permissions",
        component: Permissions,
        children: [
          {
            path: "",
            name: "Permissions",
            component: Permissions,
          },
          {
            path: "add-permission",
            name: "AddPermission",
            component: AddPermission,
          },
          {
            path: ":id/edit-permission",
            name: "EditPermission",
            component: EditPermission,
          },
        ],
      },
      {
        path: "roles",
        component: Roles,
        children: [
          {
            path: "",
            name: "Roles",
            component: Roles,
          },
          {
            path: "add-role",
            name: "AddRole",
            component: AddRole,
          },
          {
            path: ":id/edit-role",
            name: "EditRole",
            component: EditRole,
          },
        ],
      },
    ],
  },
];

export default routes;
