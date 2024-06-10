<template>
<md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
            <h3 class="md-title">{{ $route.name }}</h3>
        </div>
        <div class="md-toolbar-section-end">
            <md-button class="md-just-icon md-simple md-toolbar-toggle" :class="{ toggled: $sidebar.showSidebar }" @click="toggleSidebar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </md-button>

            <div class="md-collapse">
                <div class="md-autocomplete">
                    <md-autocomplete class="search" v-model="selectedEmployee" :md-options="employees">
                        <label>Search...</label>
                    </md-autocomplete>
                </div>
                <md-list>

                    <li class="md-list-item">
                        <a href="#" class="md-list-item-router md-list-item-container md-button-clean dropdown">
                            <div class="md-list-item-content">
                                <drop-down>
                                    <md-button slot="title" class="md-button md-just-icon md-simple" data-toggle="dropdown">
                                        <md-icon>settings</md-icon>
                                        <p class="hidden-lg hidden-md">Setting</p>
                                    </md-button>
                                    <ul class="dropdown-menu dropdown-menu-right">

                                       
                                        <li>
                                            <router-link to="logout" @click.native="logout">Logout</router-link>
                                        </li>
                                       
                                    </ul>
                                </drop-down>
                            </div>
                        </a>
                    </li>

                </md-list>
            </div>
        </div>
    </div>
</md-toolbar>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            selectedEmployee: null,

        };
    },
    methods: {
        toggleSidebar() {
            this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
        },
        async logout() {
            try {
                // Send a GET request to the logout endpoint
                const response = await axios.get('http://127.0.0.1:8000/api/logout', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });

                // Clear user data and redirect to the login page
                localStorage.removeItem('authToken'); // Clear the auth token
                this.$router.push({
                    name: 'Login'
                }); // Redirect to the login page

                // Log the response message
                console.log(response.data.message);
            } catch (error) {
                console.error('Error logging out:', error);
            }
        }
    },
};
</script>

<style lang="css"></style>
