<template>
  <div class="reservation-container">
    <div class="reservation-image">
      <img src="../assets/logo-sharkpaws.png" alt="SharkPaws">
    </div>
    <div class="reservation-form">
      <h2>Reserva una estancia para tu mascota</h2>
      
      <div v-if="!authStore.isAuthenticated" class="auth-required">
        <p>Para crear una reserva, es necesario tener una cuenta.</p>
        <div class="auth-buttons">
          <router-link to="/login?redirect=/reservas" class="auth-button login">Iniciar Sesión</router-link>
          <router-link to="/registro" class="auth-button register">Crear Cuenta</router-link>
        </div>
      </div>
      
      <form v-else @submit.prevent="submitForm" class="form-container">
        <!-- Sección Dueño -->
        <div class="form-section">
          <h3>Datos del Dueño</h3>
          <div class="form-group">
            <label for="ownerName">Nombre completo*</label>
            <input 
              type="text" 
              id="ownerName" 
              v-model="form.ownerName" 
              required
              placeholder="Ingresa tu nombre completo"
              :disabled="authStore.user?.name"
            >
          </div>
          <div class="form-group">
            <label for="ownerEmail">Correo electrónico*</label>
            <input 
              type="email" 
              id="ownerEmail" 
              v-model="form.ownerEmail" 
              required
              placeholder="ejemplo@correo.com"
              :disabled="authStore.user?.email"
            >
          </div>
        </div>

        <!-- Sección Mascota -->
        <div class="form-section">
          <h3>Datos de la Mascota</h3>
          <div class="form-group">
            <label for="petName">Nombre de la mascota*</label>
            <input 
              type="text" 
              id="petName" 
              v-model="form.petName" 
              required
              placeholder="Nombre de tu mascota"
            >
          </div>
          <div class="form-group">
            <label for="petType">Tipo de mascota*</label>
            <select id="petType" v-model="form.petType" required>
              <option value="">Selecciona...</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>

        <!-- Sección Reserva -->
        <div class="form-section">
          <h3>Detalles de la Reserva</h3>
          <div class="form-group">
            <label for="startDate">Fecha de ingreso*</label>
            <input 
              type="date" 
              id="startDate" 
              v-model="form.startDate" 
              :min="minDate"
              required
            >
          </div>
          <div class="form-group">
            <label for="endDate">Fecha de salida*</label>
            <input 
              type="date" 
              id="endDate" 
              v-model="form.endDate" 
              :min="form.startDate || minDate"
              required
            >
          </div>
          <div class="form-group">
            <label>Servicios adicionales</label>
            <div class="checkbox-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  v-model="form.services" 
                  value="baño"
                > Baño premium
              </label>
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  v-model="form.services" 
                  value="corte"
                > Corte de pelo
              </label>
            </div>
          </div>
        </div>

        <button type="submit" class="submit-button">Reservar Ahora</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import PaymentGateway from './PaymentGateway.vue';

export default {
  components: {
    PaymentGateway
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    return { authStore };
  },
  data() {
    return {
      minDate: new Date().toISOString().split('T')[0],
      form: {
        ownerName: '',
        ownerEmail: '',
        petName: '',
        petType: '',
        startDate: '',
        endDate: '',
        services: []
      },
      showPaymentGateway: false,
      reservationData: null
    };
  },
  mounted() {
    // Si el usuario está autenticado, prellenar datos del formulario
    if (this.authStore.user) {
      this.form.ownerName = this.authStore.user.name || '';
      this.form.ownerEmail = this.authStore.user.email || '';
    }
  },
  methods: {
    async submitForm() {
      try {
        // Guardar los datos de la reserva temporalmente
        this.reservationData = { ...this.form };
        
        // Redirigir a la pasarela de pago
        this.$router.push({ 
          name: 'payment',
          params: { reservationData: JSON.stringify(this.reservationData) }
        });
      } catch (error) {
        console.error("Error completo:", error.response?.data || error.message);
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    },
    resetForm() {
      // No resetear los datos del dueño si está autenticado
      const ownerName = this.authStore.user ? this.authStore.user.name || '' : '';
      const ownerEmail = this.authStore.user ? this.authStore.user.email || '' : '';
      
      this.form = {
        ownerName,
        ownerEmail,
        petName: '',
        petType: '',
        startDate: '',
        endDate: '',
        services: []
      };
    },
    async handlePaymentComplete(paymentDetails) {
      try {
        // Primero creamos la mascota
        const mascotaResponse = await axios.post(
          'http://localhost:8000/api/crear-mascota/',
          {
            nombre: this.reservationData.petName,
            tipo: this.reservationData.petType,
            usuario_id: this.authStore.user.id // Asociar con el usuario actual
          }
        );

        // Luego creamos la reserva con el ID de la mascota
        const reservaResponse = await axios.post(
          'http://localhost:8000/api/crear-reserva/',
          {
            mascota_id: mascotaResponse.data.id,
            fecha_inicio: this.reservationData.startDate,
            fecha_fin: this.reservationData.endDate,
            servicios: this.reservationData.services,
            usuario_id: this.authStore.user.id, // Asociar con el usuario actual
            detalles_pago: paymentDetails
          }
        );

        this.showPaymentGateway = false;
        this.resetForm();
        
        // Redireccionar al panel de usuario
        this.$router.push('/panel-usuario');
      } catch (error) {
        console.error("Error al guardar la reserva:", error.response?.data || error.message);
        alert(`Error: ${error.response?.data?.message || error.message}`);
        this.showPaymentGateway = false;
      }
    },
    cancelPayment() {
      this.showPaymentGateway = false;
    }
  }
};
</script>

<style scoped>
.reservation-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.reservation-image {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
}

.reservation-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.reservation-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #142733;
  margin-bottom: 2rem;
  text-align: center;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #9CBEC2;
}

h3 {
  color: #142733;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #142733;
  font-weight: 500;
}

input, select, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #9CBEC2;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
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
  margin-top: 1rem;
}

.submit-button:hover {
  background-color: #1a3340;
}

.auth-required {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  border-left: 4px solid #9CBEC2;
}

.auth-required p {
  margin-bottom: 1.5rem;
  color: #142733;
  font-size: 1.1rem;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.auth-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
}

.auth-button.login {
  background-color: #142733;
  color: white;
}

.auth-button.login:hover {
  background-color: #1a3340;
}

.auth-button.register {
  background-color: white;
  color: #142733;
  border: 1px solid #142733;
}

.auth-button.register:hover {
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .reservation-container {
    grid-template-columns: 1fr;
  }

  .reservation-image {
    display: none;
  }
}
</style>