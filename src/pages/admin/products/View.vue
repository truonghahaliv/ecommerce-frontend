<template>
    <div class="content">
        <div class="md-layout">
            
    
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
    
              <router-link to="/products/add-product">Add Product</router-link>
             
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Product List</h4>
                    </md-card-header>
                    <md-card-content>
                        <products-table table-header-color="green"></products-table>
                    </md-card-content>
                </md-card>
            </div>
    
        </div>
    </div>
    </template>
    
    <script>
import ProductsTable from '../../../components/Tables/ProductsTable.vue';
    export default {
        components: {
    
            ProductsTable
        },
    };
    </script>
    