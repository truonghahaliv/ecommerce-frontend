<template>
    <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
            <h4 class="title">Add User</h4>
        </md-card-header>

        <md-card-content>
            <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-25">
                    <md-field>
                        <label>Email</label>
                        <md-input v-model="model.user.email" type="email"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-25">
                    <md-field>
                        <label>Name</label>
                        <md-input v-model="model.user.name" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-25">
                    <md-field>
                        <label>Password</label>
                        <md-input v-model="model.user.password" type="password"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-25">
                    <md-field>
                        <label>Re-Password</label>
                        <md-input v-model="model.user.rePassword" type="password"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-size-100 text-right">
                    <md-button @click="saveUser" class="md-raised md-success">Add User</md-button>
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
    name: 'addUser',
    data() {
        return {
            errorList: '',
            model: {
                user: {
                    name: '',
                    email: '',
                    password: '',
                    rePassword: ''
                }
            }
        };
    },
    methods: {
        open() {
            this.$toast.open({
                message: "Test message from Vue",
                type: "success",
                duration: 5000,
                dismissible: true
            })
        },

        openLoading() {
            this.$loading('loading...');
            let self = this;
            setTimeout(function () {
                self.closeLoading()
            }, 2000)
        },
        closeLoading() {
            this.$loading.close();
        },
        saveUser() {
            this.errorList = '';

            if (this.model.user.password !== this.model.user.rePassword) {
                this.errorList = 'Passwords do not match';

            }

            axios.post('http://127.0.0.1:8000/api/users', this.model.user)
                .then(response => {
                    console.log(response);
                    this.$router.push({
                        name: 'Users'
                    });
                    // VueToast.success('User added successfully');
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status === 500) {
                            this.errorList = error.response.data.error;

                        } else {
                            this.errorList = error.response.data.message || 'An error occurred';

                        }
                    } else if (error.request) {
                        console.log(error.request);
                        this.errorList = 'No response received from server';

                    } else {
                        console.log('Error', error.message);
                        this.errorList = error.message;

                    }
                    console.log(error.config);
                    // VueToast.error(this.errorList);
                });
        }
    }
};
</script>

<style scoped>
.error {
    color: red;
}
</style>
