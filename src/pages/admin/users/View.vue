<template>
<div class="content">
    <div class="md-layout">
        

        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">

          <router-link to="/users/add-user">Add User</router-link>
         
            <md-card>
                <md-card-header data-background-color="green">
                    <h4 class="title">User List</h4>
                </md-card-header>
                <md-card-content>
                    <users-table table-header-color="green"></users-table>
                </md-card-content>

            </md-card>
        </div>

    </div>
</div>
</template>

<script>
import UsersTable from '../../../components/Tables/UsersTable.vue';

export default {
    components: {

        UsersTable
    },
};
</script>
