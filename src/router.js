// router.js

import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import DetailCharacter from "./components/DetailCharacter.vue";

const routes = [
  { path: "/", component: Home, name:  "home" },
  { path: "/detalle-personaje/:id", component: DetailCharacter, name:  "detail" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
