<template>
    <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
            <h4 class="title">Add Category</h4>
        </md-card-header>

        <md-card-content>
            <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                        <label>Description</label>
                        <md-input v-model="model.category.description" type="email"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-50">
                    <md-field>
                        <label>Name</label>
                        <md-input v-model="model.category.name" type="text"></md-input>
                    </md-field>
                </div>
                
                <div class="md-layout-item md-size-100 text-right">
                    <md-button @click="saveCategory" class="md-raised md-success">Add Category</md-button>
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
import swal from 'sweetalert2';

export default {
    name: 'addCategory',
    data() {
        return {
            errorList: '',
            model: {
                category: {
                    name: '',
                    description: '',
                   
                }
            }
        };
    },
    methods: {
       
        saveCategory() {
            this.errorList = '';

          

            axios.post('http://127.0.0.1:8000/api/categories', this.model.category)
                .then(response => {
                    swal.fire({
                        title: "Success!",
                        text: "Category add successfully!",
                        icon: "success"
                    });
                    this.$router.push({
                        name: 'Categories'
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
