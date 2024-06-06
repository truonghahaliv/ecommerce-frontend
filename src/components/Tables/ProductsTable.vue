<template>
<div>
    <md-table v-model="products.data" :table-header-color="tableHeaderColor">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
            <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Price">{{ item.price }}</md-table-cell>
            <md-table-cell md-label="Quantity">{{ item.quantity }}</md-table-cell>
            <md-table-cell md-label="Quantity Sold">{{ item.quantity_sold }}</md-table-cell>
            <md-table-cell md-label="Description">{{ item.description }}</md-table-cell>
            <md-table-cell md-label="Image">
                <img :src="item.image" alt="Product Image" class="product-image" />
            </md-table-cell>
            <md-table-cell md-label="Action">
                <md-button @click="editProduct(item.id)" class="md-icon-button md-primary">
                    <md-icon>edit</md-icon>
                </md-button>
                <md-button @click="deleteProduct(item.id)" class="md-icon-button md-danger">
                    <md-icon>delete</md-icon>
                </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
    <pagination v-model="products.current_page" :total="products.total" :per-page="products.per_page" :records="products.total" @paginate="myCallback" class="pagination"></pagination>
</div>
</template>

<script>
import axios from 'axios';
import Pagination from 'vue-pagination-2';
export default {
    name: "products-table",
    props: {
        tableHeaderColor: {
            type: String,
            default: "",
        },
    },
    components: {
        Pagination
    },
    data() {
        return {
            products: {
                data: [],
                current_page: 1,
                per_page: 10,
                total: 0
            },

        };
    },
    mounted() {

        this.fetchProducts();
    },
    methods: {
        fetchProducts(page =1) {
            axios.get(`http://127.0.0.1:8000/api/products?page=${page}`)

                .then(response => {
                    this.products = response.data;
                    this.products.current_page = response.data.current_page;
                    this.products.per_page = response.data.per_page;
                    this.products.total = response.data.total;
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        },
        editProduct(productId) {
            this.$router.push({
                name: 'EditProduct',
                params: {
                    id: productId
                }
            });
        },
        deleteProduct(productId) {
            if (confirm('Are you sure you want to delete this product?')) {
                axios.delete(`http://127.0.0.1:8000/api/products/${productId}`)
                    .then(response => {
                        alert('Delete successfull');
                        this.fetchProducts(); // Refresh the list
                    })
                    .catch(error => {
                        console.error('Error deleting product:', error);
                    });
            }
        },
        myCallback(newPage) {

            this.fetchProducts(newPage);
        }
    }

};
</script>
