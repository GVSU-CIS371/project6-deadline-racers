<template>
  <v-container>
    <v-form @submit.prevent="createProduct">
      <v-text-field v-model="newProduct.name" label="Product Name" required></v-text-field>
      <v-text-field v-model="newProduct.description" label="Product Description" required></v-text-field>
      <v-text-field v-model="newProduct.price" label="Product Price" required></v-text-field>
      <v-text-field v-model="newProduct.category" label="Product Category" required></v-text-field>
      <v-text-field v-model="newProduct.image" label="Product Image" required></v-text-field>
      <v-text-field v-model="newProduct.stock" label="Product Stock" required></v-text-field>
      <v-text-field v-model="newProduct.rating" label="Product Rating" required></v-text-field>
      <v-btn type="submit">Create Product</v-btn>
    </v-form>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="product in products" :key="product.id">
        <store-item :product="product"></store-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useProductStore } from '../stores/ProductStore';
import StoreItem from './StoreItem.vue';


const productStore = useProductStore();
const products = ref(productStore.products);
const newProduct = ref({
  name: '',
  description: '',
  price: '',
  category: '',
  image: '',
  stock: '',
  rating: ''

});

watch(() => productStore.products, (newProducts) => {
  products.value = newProducts;
});

onMounted(async () => {
  await productStore.init();
});

const createProduct = async () => {
  if (window.confirm('Are you sure you want to create this product?')) {
    await productStore.createProduct({
    data: {
      name: newProduct.value.name,
      description: newProduct.value.description,
      price: parseFloat(newProduct.value.price),
      rating: parseFloat(newProduct.value.rating),
      stock: parseInt(newProduct.value.stock),
      image: newProduct.value.image,
      category: newProduct.value.category
    }
    
});
    newProduct.value = {
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      stock: '',
      rating: ''
    };
  }
};
</script>