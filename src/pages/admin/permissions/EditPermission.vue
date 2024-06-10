<template>
    <md-card>
        <md-card-header>
            <h4 class="title">Edit Permission</h4>
        </md-card-header>
    
        <md-card-content>
            <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                        <label> Name</label>
                        <md-input v-model="permission.name" type="text"></md-input>
                    </md-field>
                </div>
                
    
                <div class="md-layout-item md-size-100 text-right">
                    <md-button @click="updatePermission" class="md-raised md-success">Update Permission</md-button>
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
        name: 'EditPermission',
        data() {
            return {
                id: '',
                errorList: '',
                permission: {
                    name: '',

                },
    
            };
        },
        mounted() {
            this.id = this.$route.params.id;
            this.fetchPermission()
        },
    
        methods: {
    
            fetchPermission() {
                axios.get(`http://127.0.0.1:8000/api/permissions/${this.id}`)
                    .then(response => {
                        this.permission = response.data;
                    })
                    .catch(error => {
                        console.error('Error fetching permission:', error);
                    });
            },
            updatePermission() {
                axios.put(`http://127.0.0.1:8000/api/permissions/${this.id}`, this.permission)
                    .then(response => {
                        console.log(response.data)
                        alert('Permission updated successfully');
                        this.$router.push({
                            name: 'Permissions'
                        });
                    })
                    .catch(error => {
                        console.error('Error updating permission:', error);
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
    