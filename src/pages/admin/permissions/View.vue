<template>
    <div class="content">
        <div class="md-layout">
            
    
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
    
              <router-link to="/permissions/add-permission">Add Permission</router-link>
             
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Permission List</h4>
                    </md-card-header>
                    <md-card-content>
                        <permission-table table-header-color="green"></permission-table>
                    </md-card-content>
                </md-card>
            </div>
    
        </div>
    </div>
    </template>
    
    <script>
import PermissionTable from "@/components/Tables/PermissionsTable";

export default {
    components: {

        PermissionTable
    },
};
    </script>
    