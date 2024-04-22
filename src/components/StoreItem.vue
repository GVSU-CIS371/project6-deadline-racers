<template>
  <v-card d-flex class="pa-3" min-height="500px">
    <!-- Product Details -->
    <v-card-title>{{ product.data.name }}</v-card-title>
    <v-img class="mt-4" :src="product.data.image" min-width="200px" height="200px"></v-img>
    <v-card-subtitle >
      <v-rating v-model="product.data.rating" color="orange" size="20" class="ma-1"/>
      <v-icon icon="mdi-cash" size="20" color="green" class="ml-5 mb-1"/>
      {{ product.data.price }}
      <v-icon icon="mdi-package-variant-closed" size="20" color="blue" class="ml-5 mb-1"/>
      {{ product.data.stock }}
    </v-card-subtitle>
    <v-card-text>{{ product.data.description }}</v-card-text>
    <v-row d-flex justify="center" align="center" class="gc-5 pt-5">
      <v-btn color="secondary" variant="tonal" text="Edit" @click="isUpdating = true"></v-btn>
      <v-btn variant="tonal" color="error" @click="deleteProduct(product)">Delete</v-btn>
    </v-row>

    <!-- Update Dialog -->
    <v-dialog v-model="isUpdating" max-width="500" max-height="500px" class="pa-4">
      <v-card class="pa-6">
        <v-text-field v-model="product.data.name" label="Name"></v-text-field>
        <v-text-field v-model="product.data.image" label="Image URL"></v-text-field>
        <v-text-field v-model="product.data.description" label="Description"></v-text-field>
        <v-row>
          <v-col>
            <v-text-field v-model="product.data.price" label="Price $"/>
          </v-col>
          <v-col>
            <v-text-field v-model="product.data.stock" label="Stock"/>
          </v-col>
        </v-row>
        <v-slider label="Rating" thumb-label="always" v-model="product.data.rating" min="0" max="5" step=".5"></v-slider>     
        <v-row>
          <v-col>
            <v-btn color="secondary" variant="tonal" class="mt-2" block @click="updateProduct">Update</v-btn>
          </v-col>
          <v-col>
            <v-btn color="error" variant="tonal" class="mt-2" block @click="cancelUpdate">Cancel</v-btn>
          </v-col>
        </v-row>         
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch } from 'vue';
import { ProductDoc } from '../types/product';
import { db } from "../main";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

const { product } = defineProps<{ product: ProductDoc }>();
const isUpdating = ref(false);
let tempProductData: ProductDoc | null = null; // Temporary copy of product data

// Function to create a temporary copy of product data
const createTempProductData = () => {
  tempProductData = JSON.parse(JSON.stringify(product)); // Deep clone the product data
};

// Update Product
const updateProduct = async () => {
  const prodDocRef = doc(db, 'products', product.id);
  try {
    await updateDoc(prodDocRef, {
      name: product.data.name,
      image: product.data.image,
      description: product.data.description,
      price: product.data.price,
      stock: product.data.stock,
      rating: product.data.rating
    });
    isUpdating.value = false; // Close the dialog after updating
  } catch (err) {
    console.error("Failed updating product: ", err);
  }
};

// Cancel Update
const cancelUpdate = () => {
  if (tempProductData) {
    // Restore the original product data
    Object.assign(product.data, tempProductData.data);
  }
  isUpdating.value = false; // Close the dialog
};

// Delete Product
const deleteProduct = async (prod: ProductDoc) => {
  const prodDocRef = doc(db, 'products', prod.id)
  try {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteDoc(prodDocRef);
      window.location.reload();
    }
  } catch (err) {
    console.error("Failed deleting product: ", err)
  }
};

// Watch for changes in the isUpdating flag and create a temporary copy of product data when it becomes true
watch(isUpdating, (newValue) => {
  if (newValue) {
    createTempProductData();
  }
});
</script>
