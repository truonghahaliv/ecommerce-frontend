<template>
<div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar :sidebar-item-color="sidebarBackground" :sidebar-background-image="sidebarBackgroundImage">
        <mobile-menu slot="content"></mobile-menu>
        <sidebar-link to="/dashboard">
            <md-icon>dashboard</md-icon>
            <p>Dashboard</p>
        </sidebar-link>

        <sidebar-link to="/users">
            <md-icon>person</md-icon>
            <p>User</p>
        </sidebar-link>
        <sidebar-link to="/products">
            <md-icon>product</md-icon>
            <p>Product</p>
        </sidebar-link>
        <sidebar-link to="/categories">
            <md-icon></md-icon>
            <p>Category</p>
        </sidebar-link>

        <sidebar-link to="/permissions">
            <md-icon></md-icon>
            <p>Permission</p>
        </sidebar-link>
        <sidebar-link to="/roles">
            <md-icon></md-icon>
            <p>Roles</p>
        </sidebar-link>
       
        <sidebar-link to="/typography">
            <md-icon>library_books</md-icon>
            <p>Typography</p>
        </sidebar-link>
        <sidebar-link to="/icons">
            <md-icon>bubble_chart</md-icon>
            <p>Icons</p>
        </sidebar-link>

        <sidebar-link to="/notifications">
            <md-icon>notifications</md-icon>
            <p>Notifications</p>
        </sidebar-link>

    </side-bar>

    <div class="main-panel">
        <top-navbar></top-navbar>

        <fixed-plugin :color.sync="sidebarBackground" :image.sync="sidebarBackgroundImage">
        </fixed-plugin>

        <dashboard-content> </dashboard-content>

        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
</div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
    components: {
        TopNavbar,
        DashboardContent,
        ContentFooter,
        MobileMenu,
    },
    data() {
        return {
            sidebarBackground: "green",
            sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
        };
    },
};
</script>
