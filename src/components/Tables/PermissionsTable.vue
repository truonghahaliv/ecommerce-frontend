<template>
    <div>
        <md-table v-model="permissions.data" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Action">
                    <md-button @click="editPermission(item.id)" class="md-icon-button md-primary">
                        <md-icon>edit</md-icon>
                    </md-button>
                    <md-button @click="deletePermission(item.id)" class="md-icon-button md-danger">
                        <md-icon>delete</md-icon>
                    </md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <pagination v-model="permissions.current_page" :total="permissions.total" :per-page="permissions.per_page" :records="permissions.total" @paginate="myCallback" class="pagination"></pagination>
    </div>
    </template>
    
      
    <script>
    import axios from 'axios';
    import Pagination from 'vue-pagination-2';
    export default {
        name: 'permission-table',
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
                permissions: {
                    data: [],
                    current_page: 1,
                    per_page: 10,
                    total: 0
                },
            };
        },
        mounted() {
            this.fetchPermissions();
        },
        methods: {
            fetchPermissions(page = 1) {
                axios.get(`http://127.0.0.1:8000/api/permissions?page=${page}`)
                    .then(response => {
                        this.permissions.data = response.data.data;
                        this.permissions.current_page = response.data.current_page;
                        this.permissions.per_page = response.data.per_page;
                        this.permissions.total = response.data.total;
                    })
                    .catch(error => {
                        console.error('Error fetching permissions:', error);
                    });
            },
            editPermission(permissionId) {
                this.$router.push({
                    name: 'EditPermission',
                    params: {
                        id: permissionId
                    }
                });
            },
            deletePermission(permissionId) {
                if (confirm('Are you sure you want to delete this permission?')) {
                    axios.delete(`http://127.0.0.1:8000/api/permissions/${permissionId}`)
                        .then(response => {
                            alert(response.data.message);
                            this.fetchPermissions(); // Refresh the list
                        })
                        .catch(error => {
                            console.error('Error deleting permission:', error);
                        });
                }
            },
            myCallback(newPage) {
    
                this.fetchPermissions(newPage);
            }
        },
    };
    </script>
    