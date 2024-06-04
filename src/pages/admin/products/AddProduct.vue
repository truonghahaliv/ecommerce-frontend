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
    name: 'addProduct',
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
            id: null,
            errors: {}
        };
    },
    methods: {
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

            axios.post('http://127.0.0.1:8000/api/products', this.model.product)
                .then(response => {
                    console.log(response);
                    this.$router.push({
                        name: 'Products'
                    });

                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status === 500) {
                            this.errorList = error.response.data.error;

                        } else {
                            this.errorList = error.response.data.message || 'An error occurred';

                        }
                    } else if (error.request) {
                        console.log(error.request);
                        this.errorList = 'No response received from server';

                    } else {
                        console.log('Error', error.message);
                        this.errorList = error.message;

                    }
                    console.log(error.config);
                    // VueToast.error(this.errorList);
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
