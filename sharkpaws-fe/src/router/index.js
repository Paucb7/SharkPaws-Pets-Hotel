// Importa las funciones necesarias desde Vue Router
import { createRouter, createWebHistory } from 'vue-router';

// Importa tus componentes (las páginas)
import HomeView from '../views/HomeView.vue';
import Reservations from '../components/Reservations.vue';
import Servicios from '../views/Servicios.vue';
import Contacto from '../views/Contacto.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import UserPanelView from '../views/UserPanelView.vue';
import PaymentGateway from '../components/PaymentGateway.vue';

// Store para autenticación
import { useAuthStore } from '../stores/auth';

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
    component: Reservations,
    meta: { requiresAuth: true }
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
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/registro',
    name: 'registro',
    component: RegisterView
  },
  {
    path: '/panel-usuario',
    name: 'user-panel',
    component: UserPanelView,
    meta: { requiresAuth: true }
  },
  {
    path: '/pago/:reservationData',
    name: 'payment',
    component: PaymentGateway,
    meta: { requiresAuth: true },
    props: route => ({ reservationData: JSON.parse(route.params.reservationData) })
  }
  // Puedes agregar más rutas aquí luego (ej: /servicios, /contacto)
];

// Crea el router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes                       // Las rutas definidas arriba
});

// Guardia de navegación para rutas protegidas
router.beforeEach((to, from, next) => {
  // Verifica si la ruta requiere autenticación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const authStore = useAuthStore();
    // Si no está autenticado, redirige al login
    if (!authStore.isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

// Exporta el router para usarlo en main.js
export default router;