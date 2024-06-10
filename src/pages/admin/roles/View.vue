<template>
    <div class="content">
        <div class="md-layout">
            
    
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
    
              <router-link to="/roles/add-role">Add Role</router-link>
             
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Role List</h4>
                    </md-card-header>
                    <md-card-content>
                        <role-table table-header-color="green"></role-table>
                    </md-card-content>
                </md-card>
            </div>
    
        </div>
    </div>
    </template>
    
    <script>
import RoleTable from "@/components/Tables/RolesTable";

export default {
    components: {

        RoleTable
    },
};
    </script>
    