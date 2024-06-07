<template>
<div class="login-form">
    <form @submit.prevent="handleLogin">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="text" id="email" v-model="loginData.email" class="form-control" required />
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="loginData.password" class="form-control" required />
        </div>
        <div v-if="errorList" class="md-layout-item md-size-100">
            <p class="error">{{ errorList }}</p>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <div class="links">
            <div class="register-link">m co tk ckua
                ? <router-link to="/register">Register</router-link>

            </div>
            <div class="forgot-link">
                <router-link to="/forgotPassword">Forgot Password</router-link>

            </div>
        </div>
    </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'login',
    data() {
        return {
            errorList: '',
            loginData: {
                email: '',
                password: '',
            },

            errors: {}
        };
    },
    methods: {
        handleLogin() {
            this.errorList = '';

            axios.post('http://localhost:8000/api/login', this.loginData)
                .then(response => {
                    console.log(this.loginData)
                    console.log('Success:', response.data);
                    this.$router.push({
                        name: 'Dashboard'
                    });
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        this.errorList = error.response.data.message; 
                    } else {
                        this.errorList = 'An error occurred. Please try again later.';
                    }
                });
        },
    },
};
</script>

<style>
.login-form {
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

.form-control {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}

.btn {
    width: 100%;
    padding: 10px;
}

.links {
    margin-top: 20px;
}

.links {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}

.forgot-link {
    text-align: end;
}

.register-link router-link,
.forgot-link router-link {
    color: blue;
    text-decoration: underline;
}

.error {
    color: red;
}
</style>
