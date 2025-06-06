<template>
  <div class="auth-container">
    <div class="auth-card">
      <img src="../assets/logo-sharkpaws.png" alt="SharkPaws Logo" class="auth-logo">
      <h2>Crear Cuenta</h2>
      
      <form @submit.prevent="register" class="auth-form">
        <div class="form-group">
          <label for="name">Nombre completo</label>
          <input 
            type="text" 
            id="name" 
            v-model="name"
            required
            placeholder="Tu nombre completo"
          >
        </div>

        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input 
            type="email" 
            id="email" 
            v-model="email"
            required
            placeholder="ejemplo@correo.com"
          >
        </div>
        
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            v-model="password"
            required
            placeholder="Crea una contraseña"
          >
        </div>

        <div class="form-group">
          <label for="passwordConfirm">Confirmar contraseña</label>
          <input 
            type="password" 
            id="passwordConfirm" 
            v-model="passwordConfirm"
            required
            placeholder="Confirma tu contraseña"
          >
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <button type="submit" class="submit-button" :disabled="authStore.loading">
          {{ authStore.loading ? 'Cargando...' : 'Registrarme' }}
        </button>
      </form>
      
      <div class="auth-footer">
        ¿Ya tienes una cuenta? 
        <router-link to="/login" class="auth-link">Inicia sesión aquí</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default {
  name: 'RegisterView',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const passwordConfirm = ref('');
    const error = ref('');
    
    const register = async () => {
      error.value = '';
      
      // Validar que las contraseñas coincidan
      if (password.value !== passwordConfirm.value) {
        error.value = 'Las contraseñas no coinciden';
        return;
      }
      
      const success = await authStore.register(name.value, email.value, password.value);
      if (success) {
        router.push({ name: 'user-panel' });
      }
    };
    
    return {
      name,
      email,
      password,
      passwordConfirm,
      register,
      error,
      authStore
    };
  }
};
</script>

<style scoped>
.auth-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f8f9fa;
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.auth-logo {
  max-width: 200px;
  margin-bottom: 1rem;
}

h2 {
  color: #142733;
  margin-bottom: 1.5rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #142733;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #9CBEC2;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: left;
}

.submit-button {
  background-color: #142733;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s;
  width: 100%;
}

.submit-button:hover {
  background-color: #1a3340;
}

.submit-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.auth-footer {
  margin-top: 2rem;
  color: #6c757d;
}

.auth-link {
  color: #142733;
  text-decoration: none;
  font-weight: 500;
}

.auth-link:hover {
  text-decoration: underline;
}
</style>