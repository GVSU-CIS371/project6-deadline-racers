<template>
  <v-card>
    <v-img :src="product.data.image" aspect-ratio="1.7"></v-img>
    <v-card-title>{{ product.data.name }}</v-card-title>
    <v-card-subtitle>{{ product.data.category }}</v-card-subtitle>
    <v-card-text>{{ product.data.description }}</v-card-text>
    <v-card-subtitle>{{ product.data.rating }}</v-card-subtitle>
    <v-card-text>{{ product.data.price }}</v-card-text>
    
    <v-card-text>{{ product.data.stock }}</v-card-text>
    <v-card-actions>
      <div v-if="isEditing">
        <v-btn color="secondary" @click="updateProduct">Update</v-btn>
        <v-btn color="secondary" @click="cancelEdit">Cancel</v-btn>
      </div>
      <div v-else>
        <v-btn color="secondary" @click="modifyProduct">Modify Product</v-btn>
      </div>
      <v-btn color="error" @click="deleteProduct">Delete Product</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { ref,  defineProps, toRefs } from 'vue';
import { ProductDoc } from '../types/product';
import { useProductStore } from '../stores/ProductStore';

const props = defineProps({
  product: {
    type: Object as () => ProductDoc,
    default: () => ({}),
  },
});

const productStore = useProductStore();
const { product } = toRefs(props);
const isEditing = ref(false);
const updatedProduct = ref({...product.value});

const deleteProduct = async () => {
  if (window.confirm('Are you sure you want to delete this product?')) {
    await productStore.deleteProduct(product.value.id);
  }
};

const updateProduct = async () => {
  if (window.confirm('Are you sure you want to save these changes?')){
    await productStore.updateProduct(product.value.id, updatedProduct.value);
    isEditing.value = false;
  };
};


const modifyProduct = async () => {
  isEditing.value = true;
  updatedProduct.value = {
    id: product.value.id,
    data: {
      name: window.prompt('Enter new product name', product.value.data.name) || product.value.data.name,
      description: window.prompt('Enter new product description', product.value.data.description) || product.value.data.description,
      price: parseFloat(window.prompt('Enter new product price', product.value.data.price.toString()) || product.value.data.price.toString()),
      rating: parseFloat(window.prompt('Enter new product rating', product.value.data.rating.toString()) || product.value.data.rating.toString()),
      stock: parseInt(window.prompt('Enter new product stock', product.value.data.stock.toString()) || product.value.data.stock.toString()),
      image: window.prompt('Enter new product image URL', product.value.data.image) || product.value.data.image,
      category: window.prompt('Enter new product category', product.value.data.category) || product.value.data.category,
    }
  };

  await productStore.updateProduct(product.value.id, updatedProduct.value);
};

const cancelEdit = () => {
  isEditing.value = false;
};

</script>