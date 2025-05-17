<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="logo">SharkPaws</router-link>
    </div>
    <div class="navbar-menu">
      <router-link to="/" class="nav-item">Inicio</router-link>
      <router-link to="/servicios" class="nav-item">Servicios</router-link>
      <router-link to="/contacto" class="nav-item">Contacto</router-link>
      <router-link to="/reservas" class="nav-item">Reservas</router-link>
      
      <!-- Si está autenticado, mostrar panel de usuario -->
      <router-link v-if="authStore.isAuthenticated" to="/panel-usuario" class="nav-item">
        <span class="user-icon">👤</span> Mi Panel
      </router-link>
      
      <!-- Si no está autenticado, mostrar login/registro -->
      <template v-else>
        <router-link to="/login" class="nav-item">Iniciar Sesión</router-link>
        <router-link to="/registro" class="nav-item register-btn">Registrarse</router-link>
      </template>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '../stores/auth';

export default {
  name: 'Navbar',
  setup() {
    const authStore = useAuthStore();
    
    return {
      authStore
    };
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.navbar-menu {
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: #34495e;
}

.router-link-active {
  background-color: #34495e;
}
</style>