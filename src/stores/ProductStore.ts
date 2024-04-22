import { defineStore } from "pinia";
import { Product, ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { collection, doc, setDoc, getDocs } from "firebase/firestore"; 
import { db } from '../main';

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [] as ProductDoc[],
  }),
  actions: {
    async init(){
      const prodColRef = collection(db, 'products')
      const querySnapshot = await getDocs(prodColRef);
      if (querySnapshot.empty){
        this.products = initProducts;
        initProducts.forEach(async (prod) => {
          const prodDoc = doc(prodColRef, prod.id);
          await setDoc(prodDoc, prod.data);
        })
      } else {
        this.products = [];
        querySnapshot.forEach( async queryDoc => {
          let prod = {} as ProductDoc;
          prod.data = queryDoc.data() as Product;
          prod.id = queryDoc.id;
          this.products.push(prod)
        })
      }
    },
    filterByCategory(category: string){
      return this.products = this.products.filter(product =>
        product.data.category === category
      );
    },
    filterByRating(minRating: number){
      return this.products = this.products.filter(product =>
        product.data.rating > minRating
      );
    },
  }
});
