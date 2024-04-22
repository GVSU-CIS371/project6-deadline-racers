import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import App from "./App.vue";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { fa } from "vuetify/iconsets/fa";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import router from "./router";

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBj4e1POhCY1mguLIYzrEmKrHuCiFyrYKM",
  authDomain: "project6-dealineracers.firebaseapp.com",
  projectId: "project6-dealineracers",
  storageBucket: "project6-dealineracers.appspot.com",
  messagingSenderId: "545739124501",
  appId: "1:545739124501:web:af734f9e3d045ecc3d031c"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi, fa },
  },

  components,
  directives,
});
const pinia = createPinia();
createApp(App).use(vuetify).use(pinia).use(router).mount("#app");
