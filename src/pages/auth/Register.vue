<!-- RegisterForm.vue -->
<template>
<div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="register">
        <div class="form-group">
            <label for="username">Email:</label>
            <input type="email" id="email" v-model="userRegister.email" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="userRegister.name" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="userRegister.password" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="password">Re Password:</label>
            <input type="password" id="re-password" v-model="userRegister.rePassword" class="form-control" required>
        </div>
        <div v-if="errorList" class="md-layout-item md-size-100">
            <p class="error">{{ errorList }}</p>
        </div>
        <button type="submit" class="btn">Register</button>
        <div class="link">
            <router-link to="/login">Back To Login</router-link>
        </div>

    </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            errorList: '',

            userRegister: {
                name: '',
                email: '',
                password: '',
                rePassword: ''
            }

        };
    },
    methods: {
        register() {
            this.errorList = '';

            if (this.userRegister.password !== this.userRegister.rePassword) {
                this.errorList = 'Passwords do not match';

            }

            axios.post('http://127.0.0.1:8000/api/register', this.userRegister)
                .then(response => {
                    console.log(response);
                    this.$router.push({
                        name: 'Login'
                    });
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        this.errorList = error.response.data.message;
                    } else {
                        this.errorList = 'An error occurred. Please try again later.';
                    }
                });

        }
    }
};
</script>

<style scoped>
.register-form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    /* Đặt chiều rộng của form */
    max-width: 450px;
    /* Đặt giá trị tối đa cho chiều rộng */
    height: auto;
    /* Cho phép chiều cao tự động thay đổi */
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-group {
    margin-bottom: 15px;
}

.btn {
    width: 100%;
    padding: 10px;
}

.link {
    text-align: center;
    margin-top: 20px;
}

.error {
    color: red;
}
</style>
