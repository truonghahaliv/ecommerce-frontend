<template>
<md-card>
    <md-card-header>
        <h4 class="title">Edit User</h4>
    </md-card-header>

    <md-card-content>
        <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                    <label>User Name</label>
                    <md-input v-model="user.name" type="text"></md-input>
                </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                    <label>Email</label>
                    <md-input v-model="user.email" type="email"></md-input>
                </md-field>
            </div>

            <div class="md-layout-item md-size-100 text-right">
                <md-button @click="updateUser" class="md-raised md-success">Update User</md-button>
            </div>
            <div v-if="errorList" class="md-layout-item md-size-100">
                <p class="error">{{ errorList }}</p>
            </div>
        </div>
    </md-card-content>
</md-card>
</template>

<script>
import axios from 'axios';

export default {
    name: 'EditUser',
    data() {
        return {
            id: '',
            errorList: '',
            user: {
                name: '',
                email: '',
                password: ''
            },

        };
    },
    mounted() {
        //console.log(this.$router.params.id)
        this.id = this.$route.params.id;
        this.fetchUser()
    },

    methods: {

        fetchUser() {
            axios.get(`http://127.0.0.1:8000/api/users/${this.id}`)
                .then(response => {
                    this.user = response.data;
                })
                .catch(error => {
                    console.error('Error fetching user:', error);
                });
        },
        updateUser() {
            axios.put(`http://127.0.0.1:8000/api/users/${this.id}`, this.user)
                .then(response => {
                    console.log(response.data)
                    alert('User updated successfully');
                    this.$router.push({
                        name: 'Users'
                    });
                })
                .catch(error => {
                    console.error('Error updating user:', error);
                });
        }
    }
};
</script>

<style scoped>
.md-icon-button {
    margin: 0 5px;

}

.error {
    color: red;
}
</style>
