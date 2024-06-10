<template>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Edit Role</h4>
      </md-card-header>
  
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>Name</label>
              <md-input v-model="role.name" type="text"></md-input>
            </md-field>
          </div>
  
          <div class="md-layout-item md-size-100">
            <label>Permissions</label>
            <div>
              <md-checkbox @change="selectAllPermissions" :checked="selectAll">All</md-checkbox>
              <div class="permissions-list">
                <md-checkbox v-for="permission in permissions.data" :key="permission.id" v-model="selectedPermissions" :value="permission.id" @change="updateSelectAll">
                  {{ permission.name }}
                </md-checkbox>
              </div>
            </div>
          </div>
  
          <div class="md-layout-item md-size-25">
            <label>Assign User</label>
            <md-field>
              <label>Select User</label>
              <md-select v-model="selectedUser">
                <md-option v-for="user in users" :key="user.id" :value="user.id">
                  {{ user.name }}
                </md-option>
              </md-select>
            </md-field>
          </div>
        </div>
  
        <div class="md-layout-item md-size-100 text-right">
          <md-button @click="updateRole" class="md-raised md-success">Save Changes</md-button>
        </div>
  
        <div v-if="errorList" class="md-layout-item md-size-100">
          <p class="error">{{ errorList }}</p>
        </div>
      </md-card-content>
    </md-card>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EditRole',
    data() {
      return {
        id: '',
        errorList: '',
        role: {
          name: '',
        },
        selectedPermissions: [],
        selectedUser: null,
        selectAll: false,
        permissions: {
          data: [],
        },
        users: [],
      };
    },
    mounted() {
      this.id = this.$route.params.id;
      this.fetchRole();
      this.fetchPermissions();
      this.fetchUsers();
    },
    methods: {
      fetchRole() {
        axios.get(`http://127.0.0.1:8000/api/roles/${this.id}`)
          .then(response => {
            this.role = response.data;
            this.selectedPermissions = response.data.permissions ? response.data.permissions.map(p => p.id) : [];
            this.selectedUser = response.data.user ? response.data.user.id : null;
            this.updateSelectAll();
          })
          .catch(error => {
            console.error('Error fetching role:', error);
          });
      },
      fetchPermissions() {
        axios.get(`http://127.0.0.1:8000/api/permissions`)
          .then(response => {
            this.permissions.data = response.data.data;
            this.updateSelectAll();
          })
          .catch(error => {
            console.error('Error fetching permissions:', error);
          });
      },
      fetchUsers() {
        axios.get(`http://127.0.0.1:8000/api/users`)
          .then(response => {
            this.users = response.data.data;
          })
          .catch(error => {
            console.error('Error fetching users:', error);
          });
      },
      selectAllPermissions() {
        if (this.selectAll) {
          this.selectedPermissions = [];
        } else {
          this.selectedPermissions = this.permissions.data.map(permission => permission.id);
        }
        this.selectAll = !this.selectAll;
      },
      updateSelectAll() {
        this.selectAll = this.selectedPermissions.length === this.permissions.data.length;
      },
      updateRole() {
        this.errorList = '';
        const formData = new FormData();
        Object.keys(this.role).forEach(key => {
          formData.append(key, this.role[key]);
        });
        formData.append('permissions', JSON.stringify(this.selectedPermissions));
        formData.append('user_id', this.selectedUser);
        axios.put(`http://127.0.0.1:8000/api/roles/${this.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(response => {
            console.log(response);
            this.$router.push({
              name: 'Roles',
            });
          })
          .catch(error => {
            if (error.response) {
              if (error.response.status === 500) {
                this.errorList = error.response.data.error;
              } else {
                this.errorList = error.response.data.message || 'An error occurred';
              }
            } else if (error.request) {
              this.errorList = 'No response received from server';
            } else {
              this.errorList = error.message;
            }
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  
  .permissions-list {
    display: flex;
    flex-wrap: wrap;
  }
  
  .md-checkbox {
    margin-right: 10px;
  }
  </style>
  