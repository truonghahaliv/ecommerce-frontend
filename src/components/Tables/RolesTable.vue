<template>
    <div>
        <md-table v-model="roles.data" :table-header-color="tableHeaderColor">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Action">
                    <md-button @click="editRole(item.id)" class="md-icon-button md-primary">
                        <md-icon>edit</md-icon>
                    </md-button>
                    <md-button @click="deleteRole(item.id)" class="md-icon-button md-danger">
                        <md-icon>delete</md-icon>
                    </md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <pagination v-model="roles.current_page" :total="roles.total" :per-page="roles.per_page" :records="roles.total" @paginate="myCallback" class="pagination"></pagination>
    </div>
    </template>
    
      
    <script>
    import axios from 'axios';
    import Pagination from 'vue-pagination-2';
    export default {
        name: 'role-table',
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
                roles: {
                    data: [],
                    current_page: 1,
                    per_page: 10,
                    total: 0
                },
            };
        },
        mounted() {
            this.fetchRoles();
        },
        methods: {
            fetchRoles(page = 1) {
                axios.get(`http://127.0.0.1:8000/api/roles?page=${page}`)
                    .then(response => {
                        this.roles.data = response.data.data;
                        this.roles.current_page = response.data.current_page;
                        this.roles.per_page = response.data.per_page;
                        this.roles.total = response.data.total;
                    })
                    .catch(error => {
                        console.error('Error fetching roles:', error);
                    });
            },
            editRole(roleId) {
                this.$router.push({
                    name: 'EditRole',
                    params: {
                        id: roleId
                    }
                });
            },
            deleteRole(roleId) {
                if (confirm('Are you sure you want to delete this role?')) {
                    axios.delete(`http://127.0.0.1:8000/api/roles/${roleId}`)
                        .then(response => {
                            alert(response.data.message);
                            this.fetchRoles(); // Refresh the list
                        })
                        .catch(error => {
                            console.error('Error deleting role:', error);
                        });
                }
            },
            myCallback(newPage) {
    
                this.fetchRoles(newPage);
            }
        },
    };
    </script>
    