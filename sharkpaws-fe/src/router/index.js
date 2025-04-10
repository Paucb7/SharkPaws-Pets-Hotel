// Importa las funciones necesarias desde Vue Router
import { createRouter, createWebHistory } from 'vue-router';

// Importa tus componentes (las páginas)
import HomeView from '../views/HomeView.vue';
import Reservations from '../components/Reservations.vue';
import Servicios from '../views/Servicios.vue';
import Contacto from '../views/Contacto.vue';

// Define las rutas
const routes = [
  {
    path: '/',          // Ruta URL (ej: http://tusitio.com/)
    name: 'home',       // Nombre interno para referenciar la ruta
    component: HomeView  // Componente que se renderizará
  },
  {
    path: '/reservas',
    name: 'reservas',
    component: Reservations
  },
  {
    path: '/servicios',
    name: 'servicios',
    component: Servicios
  },
  {
    path: '/contacto',
    name: 'contacto',
    component: Contacto
  }
  // Puedes agregar más rutas aquí luego (ej: /servicios, /contacto)
];

// Crea el router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes                       // Las rutas definidas arriba
});

// Exporta el router para usarlo en main.js
export default router;