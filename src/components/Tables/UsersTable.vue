<template>
<div>
    <md-table v-model="users.data" :table-header-color="tableHeaderColor">
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

    <pagination v-model="users.current_page" :total="users.total" :per-page="users.per_page" :records="users.total" @paginate="myCallback" class="pagination"></pagination>
</div>
</template>

<script>
import axios from 'axios';
import Pagination from 'vue-pagination-2';
export default {
    name: 'users-table',
    components: {
        Pagination
    },
    props: {
        tableHeaderColor: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            users: {
                data: [],
                current_page: 1,
                per_page: 10,
                total: 0
            },
        };
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        fetchUsers(page = 1) {
            axios.get(`http://127.0.0.1:8000/api/users?page=${page}`)
                .then(response => {
                    this.users.data = response.data.data;
                    this.users.current_page = response.data.current_page;
                    this.users.per_page = response.data.per_page;
                    this.users.total = response.data.total;
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
        },
        editUser(userId) {
            this.$router.push({
                name: 'EditUser',
                params: {
                    id: userId
                }
            });
        },
        deleteUser(userId) {
            if (confirm('Are you sure you want to delete this user?')) {
                axios.delete(`http://127.0.0.1:8000/api/users/${userId}`)
                    .then(response => {
                        alert(response.data.message);
                        this.fetchUsers(this.users.current_page); // Refresh the list
                    })
                    .catch(error => {
                        console.error('Error deleting user:', error);
                    });
            }
        },

        myCallback(newPage) {

            this.fetchUsers(newPage);
        }
    }

};
</script>

<style >
.container {
  display: flex;
  justify-content: space-between;
}

.table {
  flex-grow: 1; 
}

.pagination {
    display: flex;
  align-items: center; /* Căn chỉnh các thành phần của phân trang theo chiều dọc */
  justify-content: flex-end; /* Đẩy các thành phần sang bên phải */
}

.pagination .controls {
  margin-right: 10px; 
}

.pagination .page-list {
  margin-right: auto; 
}
.pagination ul {
  list-style-type: none; /* Loại bỏ dấu chấm của các phần tử li */
}
</style>
