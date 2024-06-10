<template>
    <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
            <h4 class="title">Add Permission</h4>
        </md-card-header>

        <md-card-content>
            <div class="md-layout">
                
                <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                        <label>Name</label>
                        <md-input v-model="model.permission.name" type="text"></md-input>
                    </md-field>
                </div>
                
                <div class="md-layout-item md-size-100 text-right">
                    <md-button @click="savePermission" class="md-raised md-success">Add Permission</md-button>
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
    name: 'addPermission',
    data() {
        return {
            errorList: '',
            model: {
                permission: {
                    name: '',
                
                   
                }
            }
        };
    },
    methods: {
       
        savePermission() {
            this.errorList = '';

          

            axios.post('http://127.0.0.1:8000/api/permissions', this.model.permission)
                .then(response => {
                    console.log(response);
                    this.$router.push({
                        name: 'Permissions'
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
                        console.log(error.request);
                        this.errorList = 'No response received from server';

                    } else {
                        console.log('Error', error.message);
                        this.errorList = error.message;

                    }
                    console.log(error.config);
                 
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
