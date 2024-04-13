import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./components/Home.vue";
const routes = [
  {
    path: "/",
    name: "home",
    props: true,
    component: HomeView,
  },
  {
    path: '/clothing',
    name: 'Clothing',
    component: () => import('./components/Clothing.vue')
  },
  {
    path: '/electronics',
    name: 'Electronics',
    component: () => import('./components/Electronics.vue')
  },
  {
    path: '/groceries',
    name: 'Groceries',
    component: () => import('./components/Groceries.vue')
  },
  {
    path: '/bestseller',
    name: 'BestSeller',
    component: () => import('./components/BestSeller.vue')
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
