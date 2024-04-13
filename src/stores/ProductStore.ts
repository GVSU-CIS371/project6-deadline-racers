import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";

export const useProductStore = defineStore("ProductStore", {
  // your answer
  state: () => ({
    products: [] as ProductDoc[],
  }),
  actions: {
    init(){
      // Initialize products with initProducts array
      this.products = initProducts;
    },
    filterByCategory(category: string){
      // Filters products by category
      this.products = this.products.filter(product =>
        product.data.category === category
      );
    },
    filterByRating(minRating: number){
      // Filters products with ratings above minRating
      this.products = this.products.filter(product =>
        product.data.rating > minRating
      );
    }
  }
});
