<template>
<div>
    <md-table v-model="categories.data" :table-header-color="tableHeaderColor">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
            <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Description">{{ item.description }}</md-table-cell>
            <md-table-cell md-label="Action">
                <md-button @click="editCategory(item.id)" class="md-icon-button md-primary">
                    <md-icon>edit</md-icon>
                </md-button>
                <md-button @click="deleteCategory(item.id)" class="md-icon-button md-danger">
                    <md-icon>delete</md-icon>
                </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
    <pagination v-model="categories.current_page" :total="categories.total" :per-page="categories.per_page" :records="categories.total" @paginate="myCallback" class="pagination"></pagination>
</div>
</template>

<script>
import axios from 'axios';
import Pagination from 'vue-pagination-2';
import Swal from 'sweetalert2';
export default {
    name: 'category-table',
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
            categories: {
                data: [],
                current_page: 1,
                per_page: 10,
                total: 0
            },
        };
    },
    mounted() {
        this.fetchCategories();
    },
    methods: {
        fetchCategories(page = 1) {
            axios.get(`http://127.0.0.1:8000/api/categories?page=${page}`)
                .then(response => {
                    this.categories.data = response.data.data;
                    this.categories.current_page = response.data.current_page;
                    this.categories.per_page = response.data.per_page;
                    this.categories.total = response.data.total;
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                });
        },
        editCategory(categoryId) {
            this.$router.push({
                name: 'EditCategory',
                params: {
                    id: categoryId
                }
            });
        },
        deleteCategory(categoryId) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/categories/${categoryId}`)
                        .then(response => {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your category has been deleted.",
                                icon: "success"
                            });
                            this.fetchCategories(); // Refresh the list
                        })
                        .catch(error => {
                            console.error('Error deleting category:', error);
                            Swal.fire({
                                title: "Error!",
                                text: "There was an error deleting the category.",
                                icon: "error"
                            });
                        });
                }
            });
        },

        myCallback(newPage) {

            this.fetchCategories(newPage);
        }
    },
};
</script>
