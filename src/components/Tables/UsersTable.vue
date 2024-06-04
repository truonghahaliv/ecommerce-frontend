<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Action">
          <md-button @click="editUser(item.id)" class="md-icon-button md-primary">
            <md-icon>edit</md-icon>
          </md-button>
          <md-button @click="deleteUser(item.id)" class="md-icon-button md-danger">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  name: 'users-table',
  props: {
    tableHeaderColor: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios.get('http://127.0.0.1:8000/api/users')
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    editUser(userId) {
      this.$router.push({ name: 'EditUser', params: { id: userId } });
    },
    deleteUser(userId) {
      if (confirm('Are you sure you want to delete this user?')) {
        axios.delete(`http://127.0.0.1:8000/api/users/${userId}`)
          .then(response => {
            alert(response.data.message);
            this.fetchUsers(); // Refresh the list
          })
          .catch(error => {
            console.error('Error deleting user:', error);
          });
      }
    },
  },
};

</script>

