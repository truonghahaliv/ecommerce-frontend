<template>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Add Product</h4>
      </md-card-header>
  
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>Name</label>
              <md-input v-model="model.product.name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>Price</label>
              <md-input v-model="model.product.price" type="number" :min="1"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>Quantity</label>
              <md-input v-model="model.product.quantity" type="number" :min="0"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>Description</label>
              <md-input v-model="model.product.description" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-25">
            <md-field>
              <label>Image</label>
              <md-file @change="previewImage" accept="image/*" v-model="model.product.image"></md-file>
            </md-field>
            <div v-if="previewUrl">
              <img :src="previewUrl" alt="Product Image" class="product-preview" />
            </div>
          </div>
          <div class="md-layout-item md-size-100">
            <label>Categories</label>
            <md-checkbox @change="selectAllCategories" :checked="selectAll">All</md-checkbox>
            <div class="category-list">
              <md-checkbox v-for="category in categories.data" :key="category.id" v-model="selectedCategories" :value="category.id" @change="updateSelectAll">
                {{ category.name }}
              </md-checkbox>
            </div>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button @click="saveProduct" class="md-raised md-success">Add Product</md-button>
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
  
  export default {
    name: "addProduct",
    data() {
      return {
        errorList: '',
        model: {
          product: {
            name: '',
            price: '',
            quantity: '',
            description: '',
            image: null
          }
        },
        previewUrl: null,
        selectedCategories: [],
        selectAll: false,
        categories: {
          data: [],
         
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
      selectAllCategories() {
        if (this.selectAll) {
          this.selectedCategories = [];
        } else {
          this.selectedCategories = this.categories.data.map(category => category.id);
        }
        this.selectAll = !this.selectAll;
      },
      updateSelectAll() {
        this.selectAll = this.selectedCategories.length === this.categories.data.length;
      },
      previewImage(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = e => {
            this.previewUrl = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      saveProduct() {
        this.errorList = '';
        const formData = new FormData();
        Object.keys(this.model.product).forEach(key => {
          formData.append(key, this.model.product[key]);
        });
        formData.append('categories', JSON.stringify(this.selectedCategories));
        axios.post('http://127.0.0.1:8000/api/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response);
            this.$router.push({ name: 'Products' });
        })
          .catch(error => {
            if (error.response) {
              if (error.response.status === 500) {
                this.errorList = error.response.data.error;
              } else {
                this.errorList = error.response.data.message || 'An error occurred';
              }
            } else if (error.request) {
              this.errorList = 'No response received from server';
            } else {
              this.errorList = error.message;
            }
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  .product-preview {
    width: 200px;
    height: auto;
    margin-top: 10px;
  }
  .category-list {
    display: flex;
    flex-wrap: wrap;
  }
  .md-checkbox {
    margin-right: 10px;
  }
  </style>
