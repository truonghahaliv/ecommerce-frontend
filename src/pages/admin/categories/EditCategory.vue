<template>
<md-card>
    <md-card-header>
        <h4 class="title">Edit Category</h4>
    </md-card-header>

    <md-card-content>
        <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                    <label> Name</label>
                    <md-input v-model="category.name" type="text"></md-input>
                </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                    <label>Description</label>
                    <md-input v-model="category.description" type="text"></md-input>
                </md-field>
            </div>

            <div class="md-layout-item md-size-100 text-right">
                <md-button @click="updateCategory" class="md-raised md-success">Update Category</md-button>
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
    name: 'EditCategory',
    data() {
        return {
            id: '',
            errorList: '',
            category: {
                name: '',
                description: '',

            },

        };
    },
    mounted() {
        //console.log(this.$router.params.id)
        this.id = this.$route.params.id;
        this.fetchCategory()
    },

    methods: {

        fetchCategory() {
            axios.get(`http://127.0.0.1:8000/api/categories/${this.id}`)
                .then(response => {
                    this.category = response.data;
                })
                .catch(error => {
                    console.error('Error fetching category:', error);
                });
        },
        updateCategory() {
            axios.put(`http://127.0.0.1:8000/api/categories/${this.id}`, this.category)
                .then(response => {
                    swal.fire({
                        title: "Success!",
                        text: "Category updated successfully!",
                        icon: "success"
                    });

                    this.$router.push({
                        name: 'Categories'
                    });
                })
                .catch(error => {
                    console.error('Error updating category:', error);
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
