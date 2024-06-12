<template>
    <md-toolbar md-elevation="0" class="md-transparent">
      <!-- Toolbar content -->
      <div class="md-toolbar-row">
        <!-- Left section -->
        <div class="md-toolbar-section-start">
          <h3 class="md-title">{{ $route.name }}</h3>
        </div>
        
        <!-- Right section -->
        <div class="md-toolbar-section-end">
          <!-- Toggle sidebar button -->
          <md-button class="md-just-icon md-simple md-toolbar-toggle" :class="{ toggled: $sidebar.showSidebar }" @click="toggleSidebar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </md-button>
  
          <!-- Search and dropdown menu -->
          <div class="md-collapse">
            <!-- Search bar -->
            <div class="md-autocomplete">
              <md-autocomplete class="search" v-model="s" :md-options="s">
                <label>Search...</label>
              </md-autocomplete>
            </div>
            
            <!-- Dropdown menu -->
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
                          <!-- Use router-link to navigate to login page and call logout method -->
                          <router-link to="" @click.native="logout">Logout</router-link>
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
          const response = await axios.post('http://127.0.0.1:8000/api/logout', {}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
          });
  
          // Clear user data and redirect to the login page
          localStorage.removeItem('authToken'); // Clear the auth token
          this.$router.push({ name: 'Login' }); // Redirect to the login page
  
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
  