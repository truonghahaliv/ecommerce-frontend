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
                <label>Permission</label>
                <md-checkbox @change="selectAllPermissions" :checked="selectAll">All</md-checkbox>
                <div class="permission-list">
                    <md-checkbox v-for="permission in permissions.data" :key="permission.id" 
                    v-model="selectedPermissions" :value="permission.id" @change="updateSelectAll">
                        {{ permission.name }}
                    </md-checkbox>
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

        <!-- <div v-if="selectedPermissions.length || selectedUser" class="md-layout-item md-size-100">
            <h5>Selected Values</h5>
            <p v-if="selectedPermissions.length">Selected Permissions: {{ selectedPermissionsNames.join(', ') }}</p>
            <p v-if="selectedUser">Selected User: {{ selectedUserName }}</p>
        </div> -->
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
            users: []
        };
    },
    mounted() {
        this.id = this.$route.params.id;
        this.fetchRole();
        this.fetchPermissions();
        this.fetchUsers();
    },
    // computed: {
    //     selectedPermissionsNames() {
    //         return this.permissions.data
    //             .filter(permission => this.selectedPermissions.includes(permission.id))
    //             .map(permission => permission.name);
    //     },
    //     selectedUserName() {
    //         const user = this.users.data.find(user => user.id === this.selectedUser);
    //         return user ? user.name : '';
    //     }
    // },
    methods: {
        fetchRole() {
            axios.get(`http://127.0.0.1:8000/api/roles/${this.id}`)
                .then(response => {
                    this.role = response.data;
                    this.selectedPermissions = response.data.permissions.map(permission => permission.id);
                    this.selectedUser = response.data.user ? response.data.user.id : null;
                })
                .catch(error => {
                    console.error('Error fetching role:', error);
                });
        },
        fetchPermissions() {
            axios.get(`http://127.0.0.1:8000/api/permissions`)
                .then(response => {
                    this.permissions.data = response.data.data;
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
            console.log(this.role)

            console.log(this.selectedPermissions)
            console.log(this.selectedUser)
            axios.put(`http://127.0.0.1:8000/api/roles/${this.id}`, {
                    ...this.role,
                    permissions: this.selectedPermissions,
                    user: this.selectedUser
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
