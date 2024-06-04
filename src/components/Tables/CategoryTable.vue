<template>
    <div>
      <md-table v-model="categories" :table-header-color="tableHeaderColor">
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
    </div>
  </template>
  
  
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'category-table',
    props: {
      tableHeaderColor: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        categories: [],
      };
    },
    mounted() {
      this.fetchCategories();
    },
    methods: {
        fetchCategories() {
        axios.get('http://127.0.0.1:8000/api/categories')
          .then(response => {
            this.categories = response.data;
          })
          .catch(error => {
            console.error('Error fetching categories:', error);
          });
      },
      editCategory(categoryId) {
        this.$router.push({ name: 'EditCategory', params: { id: categoryId } });
      },
      deleteCategory(categoryId) {
        if (confirm('Are you sure you want to delete this category?')) {
          axios.delete(`http://127.0.0.1:8000/api/categories/${categoryId}`)
            .then(response => {
              alert(response.data.message);
              this.fetchCategories(); // Refresh the list
            })
            .catch(error => {
              console.error('Error deleting category:', error);
            });
        }
      },
    },
  };
  
  </script>
  
  