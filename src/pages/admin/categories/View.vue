<template>
    <div class="content">
        <div class="md-layout">
            
    
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
    
              <router-link to="/categories/add-category">Add Category</router-link>
             
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Category List</h4>
                    </md-card-header>
                    <md-card-content>
                        <category-table table-header-color="green"></category-table>
                    </md-card-content>
                </md-card>
            </div>
    
        </div>
    </div>
    </template>
    
    <script>
import CategoryTable from "@/components/Tables/CategoryTable.vue";

export default {
    components: {

      CategoryTable
    },
};
    </script>
    