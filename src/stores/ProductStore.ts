import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { collection, doc, addDoc, setDoc, updateDoc, getFirestore, getDocs, deleteDoc } from "firebase/firestore"; 
import { app } from '../main';


export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [] as ProductDoc[],
  }),
  actions: {
    async init(){
      const firestore = getFirestore(app);
      const productsCollection = collection(firestore, "products");

      const productsSnapshot = await getDocs(productsCollection);

      if (productsSnapshot.empty) {
        // Initialize products with initProducts array
        for (const product of initProducts) {
          const productDoc = doc(productsCollection);
          await setDoc(productDoc, product);
        }

        // Update local state
        this.products = initProducts;
      } else {
        // Load data from Firestore
        this.products = productsSnapshot.docs.map(doc => doc.data() as ProductDoc);
      }
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
    },
    async createProduct(product: ProductDoc) {
      try {
        const firestore = getFirestore(app);
        const productsCollection = collection(firestore, "products");
        const docRef = await addDoc(productsCollection, product);
        const productWithId = {
          id: docRef.id,
          data: product.data
        };
        await setDoc(docRef, productWithId);
        this.products.push(productWithId);
        
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
    async deleteProduct(productId: string) {
      if (!productId) {
        console.error("Product ID is not provided");
        return;
      }
      try {
        const firestore = getFirestore(app);
      const productDoc = doc(firestore, "products", productId);
      await deleteDoc(productDoc);

      this.products = this.products.filter(product => product.id !== productId);
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    },
    async updateProduct(productId: string, updatedProduct: ProductDoc) {
      const firestore = getFirestore(app);
      const productDoc = doc(firestore, "products", productId);
      await updateDoc(productDoc, updatedProduct);
      
      const index = this.products.findIndex(product => product.id === productId);
      if (index !== -1) {
        this.products[index] = updatedProduct;
      }
    }
  }
});
