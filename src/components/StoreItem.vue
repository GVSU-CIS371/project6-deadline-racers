<template>
  <v-card>
    <v-img :src="product.data.image" aspect-ratio="1.7"></v-img>
    <v-card-title>{{ product.data.name }}</v-card-title>
    <v-card-subtitle>{{ product.data.category }}</v-card-subtitle>
    <v-card-text>{{ product.data.description }}</v-card-text>
    <v-card-actions>
      <v-btn color="primary">Buy Now</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from 'vue';
import { ProductDoc } from '../types/product';

const props = defineProps({
  product: {
    type: Object as () => ProductDoc,
    default: () => ({}),
  },
});

const { product } = toRefs(props);
</script>