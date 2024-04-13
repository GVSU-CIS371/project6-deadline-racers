<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" v-for="product in products" :key="product.id">
        <v-card>
          <v-card-title>{{ product.data.name }}</v-card-title>
          <v-card-text>{{ product.data.description }}</v-card-text>
          <v-card-text>{{ product.data.price }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useProductStore } from '../stores/ProductStore';

const productStore = useProductStore();
const products = ref(productStore.products);

watch(() => productStore.products, (newProducts) => {
  products.value = newProducts;
});;

onMounted(async () => {
  await productStore.init();
  await productStore.filterByCategory('Electronics');
});
</script>