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

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCNp8uA-E5ClFGbiS41jeG6KjfaDu9GbUU",

  authDomain: "project-6-9ca49.firebaseapp.com",

  projectId: "project-6-9ca49",

  storageBucket: "project-6-9ca49.appspot.com",

  messagingSenderId: "513711846439",

  appId: "1:513711846439:web:3f790b645fee7bbc33ca02"


};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);

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
