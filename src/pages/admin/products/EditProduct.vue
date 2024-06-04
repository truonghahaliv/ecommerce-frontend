<template>
    <md-card>
        <md-card-header :data-background-color="dataBackgroundColor">
            <h4 class="title">Edit Product</h4>
        </md-card-header>

        <md-card-content>
            <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-20">
                    <md-field>
                        <label>Name</label>
                        <md-input v-model="product.name" type="text"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-20">

                    <md-field>
                        <label>Price</label>
                        <md-input v-model="product.price" type="number" :min="1"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-20">
                    <md-field>
                        <label>Quantity</label>
                        <md-input v-model="product.quantity" type="number" :min="0"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-20">
                    <md-field>
                        <label>Quantity Sold</label>
                        <md-input v-model="product.quantity_sold" type="number" :min="0"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-20">
                    <md-field>
                        <label>Description</label>
                        <md-input v-model="product.description" type="text"></md-input>
                    </md-field>
                </div>
                <!-- <div class="md-layout-item md-small-size-100 md-size-25">
                    <md-field>

                        <md-input @change="previewImage" type="file" accept="image/*" v-model="product.image"></md-input>
                    </md-field>
                    <div v-if="previewUrl">
                        <img :src="previewUrl" alt="Product Image" class="product-preview" />
                    </div>
                </div> -->


                <div class="md-layout-item md-size-100 text-right">
                    <md-button @click="updateProduct" class="md-raised md-success">Edit Product</md-button>
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
    name: 'EditProduct',
    data() {
        return {
            id: '',
            errorList: '',
           
                product: {
                    name: '',
                    price: '',
                    quantity: '',
                    quantity_sold: '',
                    image: '',
                    description: ''
                  
                }
           

        };
    },
    // methods: {
    //     previewImage(event) {
    //         const file = event.target.files[0];
    //         if (file) {
    //             const reader = new FileReader();
    //             reader.onload = e => {
    //                 this.previewUrl = e.target.result;
    //             };
    //             reader.readAsDataURL(file);
    //         }
    //     },

        
    // },
    mounted() {
        //console.log(this.$router.params.id)
        this.id = this.$route.params.id;
       
        this.fetchProduct()
    },

    methods: {

        fetchProduct() {
            axios.get(`http://127.0.0.1:8000/api/products/${this.id}`)
                .then(response => {
                    this.product = response.data;
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                });
        },
        updateProduct() {
           
            axios.put(`http://127.0.0.1:8000/api/products/${this.id}`, this.product)
                .then(response => {
                    console.log(response.product)
                    alert('Product updated successfully');
                    this.$router.push({
                        name: 'Products'
                    });
                })
                .catch(error => {
                    console.error('Error updating product:', error);
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
    /* Kích thước ảnh có thể điều chỉnh tùy ý */
    height: auto;
    /* Giữ tỉ lệ ảnh */
    margin-top: 10px;
    /* Khoảng cách từ trường nhập liệu đến ảnh xem trước */
}
</style>
