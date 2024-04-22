<template>
  <v-app>
    <v-app-bar class="bg-blue-darken-4">
      <v-toolbar-title>My Online Store</v-toolbar-title>
      <v-btn class="mx-5" v-for="link in links" :key="link.text" :to="link.to">
        <v-icon>{{ link.icon }}</v-icon>
        {{ link.text }}
      </v-btn>
      <v-btn class="mx-5" @click="openAddProductDialog"><v-icon icon="mdi-plus"/>Add Product</v-btn>
    </v-app-bar>
    <v-main class="bg-blue-lighten-5 ">
      <router-view v-slot="{ Component }">
        <transition name="shrink-explode">
          <component :is="Component" />
        </transition>
      </router-view>
      <v-dialog v-model="isAdding" max-width="500" max-height="500px" class="pa-4">
        <v-card class="pa-6">
          <v-text-field v-model="product.name" label="Name"></v-text-field>
          <v-row>
            <v-col>
              <v-text-field v-model="product.image" label="Image URL"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field v-model="product.category" label="Category"</v-text-field>
            </v-col>
          </v-row>
          <v-text-field v-model="product.description" label="Description"></v-text-field>
          <v-row>
            <v-col>
              <v-text-field v-model="product.price" label="Price $"/>
            </v-col>
            <v-col>
              <v-text-field v-model="product.stock" label="Stock"/>
            </v-col>
          </v-row>
          <v-slider label="Rating" thumb-label="always" v-model="product.rating" min="0" max="5" step=".5"></v-slider>     
          <v-row>
            <v-col>
              <v-btn color="secondary" variant="tonal" class="mt-2" block @click="addProduct">Add Product</v-btn>
            </v-col>
            <v-col>
              <v-btn color="error" variant="tonal" class="mt-2" block @click="isAdding = false">Cancel</v-btn>
            </v-col>
          </v-row>         
        </v-card>
      </v-dialog>
    </v-main>
    <v-footer color="primary" app>
      © 2023 My Online Store. All rights reserved.
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { db } from "./main";
import { addDoc, collection } from "firebase/firestore";
import { Product } from "./types/product";

const initialProduct: Product = {
  name: "",
  image: "",
  category: "",
  description: "",
  price: 0,
  stock: 0,
  rating: 0
};

const product = reactive<Product>({ ...initialProduct });

const isAdding = ref(false);

const addProduct = async () => {
  try {
    const productsCollectionRef = collection(db, 'products');
    await addDoc(productsCollectionRef, product);
    resetProduct();
    isAdding.value = false;
    window.location.reload();
  } catch (error) {
    console.error("Error adding product:", error);
  }
}

const resetProduct = () => {
  Object.assign(product, initialProduct); // Resetting the product object
}

const openAddProductDialog = () => {
  isAdding.value = true;
}

const links = ref([
  { text: "Home", to: "/", icon: "mdi-home" },
  { text: "Electronics", to: "/electronics", icon: "mdi-laptop" },
  { text: "Clothing", to: "/clothing", icon: "mdi-tshirt-crew" },
  { text: "Groceries", to: "/groceries", icon: "mdi-cart" },
  { text: "Best Seller", to: "/bestseller", icon: "mdi-cash-register" },
]);

</script>
