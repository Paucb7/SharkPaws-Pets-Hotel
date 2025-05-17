<template>
  <div class="payment-container">
    <div class="payment-card">
      <img src="../assets/logo-sharkpaws.png" alt="SharkPaws Logo" class="payment-logo">
      <h2>Pasarela de Pagos</h2>
      
      <div class="reservation-summary">
        <h3>Resumen de la Reserva</h3>
        <div class="summary-items">
          <div class="summary-row">
            <span class="summary-label">Mascota:</span>
            <span class="summary-value">{{ reservationData.petName }}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Ingreso:</span>
            <span class="summary-value">{{ formatDate(reservationData.startDate) }}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Salida:</span>
            <span class="summary-value">{{ formatDate(reservationData.endDate) }}</span>
          </div>
          <div class="summary-row" v-if="reservationData.services && reservationData.services.length > 0">
            <span class="summary-label">Servicios:</span>
            <span class="summary-value">{{ reservationData.services.join(', ') }}</span>
          </div>
          <div class="summary-row total-row">
            <span class="summary-label">Total a pagar:</span>
            <span class="summary-value">{{ totalAmount }} MXN</span>
          </div>
        </div>
      </div>
      
      <div class="payment-methods">
        <h3>Método de Pago</h3>
        <div class="payment-options">
          <div 
            class="payment-option" 
            :class="{ selected: paymentMethod === 'card' }" 
            @click="paymentMethod = 'card'"
          >
            <div class="payment-option-icon">💳</div>
            <div class="payment-option-name">Tarjeta de crédito/débito</div>
          </div>
          <div 
            class="payment-option" 
            :class="{ selected: paymentMethod === 'paypal' }" 
            @click="paymentMethod = 'paypal'"
          >
            <div class="payment-option-icon">P</div>
            <div class="payment-option-name">PayPal</div>
          </div>
        </div>
      </div>
      
      <form v-if="paymentMethod === 'card'" @submit.prevent="processPayment" class="payment-form">
        <div class="form-group">
          <label for="cardNumber">Número de Tarjeta</label>
          <input 
            type="text" 
            id="cardNumber" 
            v-model="cardNumber"
            placeholder="1234 5678 9012 3456"
            required
            maxlength="19"
            @input="formatCardNumber"
          >
        </div>
        
        <div class="form-row">
          <div class="form-group half-width">
            <label for="expiryDate">Fecha de Expiración</label>
            <input 
              type="text" 
              id="expiryDate" 
              v-model="expiryDate"
              placeholder="MM/AA"
              required
              maxlength="5"
              @input="formatExpiryDate"
            >
          </div>
          
          <div class="form-group half-width">
            <label for="cvv">CVV</label>
            <input 
              type="text" 
              id="cvv" 
              v-model="cvv"
              placeholder="123"
              required
              maxlength="3"
            >
          </div>
        </div>
        
        <div class="form-group">
          <label for="cardName">Nombre en la Tarjeta</label>
          <input 
            type="text" 
            id="cardName" 
            v-model="cardName"
            placeholder="Nombre como aparece en la tarjeta"
            required
          >
        </div>
        
        <button type="submit" class="pay-button">
          Pagar {{ totalAmount }} MXN
        </button>
      </form>
      
      <div v-else-if="paymentMethod === 'paypal'" class="paypal-container">
        <div class="paypal-message">
          <p>Serás redirigido a PayPal para completar el pago.</p>
        </div>
        <button @click="processPayment" class="pay-button paypal-button">
          Pagar con PayPal
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'PaymentGateway',  props: {
    reservationData: {
      type: Object,
      required: true
    }
  },
  beforeMount() {
    // Si no hay datos de reserva, redirigir a la página de reservas
    if (!this.reservationData) {
      this.$router.push('/reservas');
    }
  },
  setup(props, { emit }) {
    const router = useRouter();
    
    // Estado para la interfaz de pago
    const paymentMethod = ref('card');
    const cardNumber = ref('');
    const expiryDate = ref('');
    const cvv = ref('');
    const cardName = ref('');
    
    // Calculamos el total basado en la estancia y servicios adicionales
    const totalAmount = computed(() => {
      let total = 0;
      
      // Calculamos días de estancia
      if (props.reservationData.startDate && props.reservationData.endDate) {
        const start = new Date(props.reservationData.startDate);
        const end = new Date(props.reservationData.endDate);
        const days = Math.round((end - start) / (1000 * 60 * 60 * 24));
        
        // Precio base por día: 500 MXN
        total += days * 500;
      }
      
      // Agregamos costos por servicios adicionales
      if (props.reservationData.services && props.reservationData.services.length > 0) {
        if (props.reservationData.services.includes('baño')) {
          total += 300; // Costo del baño premium
        }
        
        if (props.reservationData.services.includes('corte')) {
          total += 250; // Costo del corte de pelo
        }
      }
      
      return total;
    });
    
    // Formateadores para campos de tarjeta
    const formatCardNumber = () => {
      // Remove non-digit characters
      let value = cardNumber.value.replace(/\D/g, '');
      
      // Add a space after every 4 digits
      let formattedValue = '';
      for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedValue += ' ';
        }
        formattedValue += value[i];
      }
      
      cardNumber.value = formattedValue;
    };
    
    const formatExpiryDate = () => {
      // Remove non-digit characters
      let value = expiryDate.value.replace(/\D/g, '');
      
      // Format as MM/YY
      if (value.length > 2) {
        expiryDate.value = value.substring(0, 2) + '/' + value.substring(2);
      } else {
        expiryDate.value = value;
      }
    };
    
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    };
    
    // Procesamiento del pago (simulado)
    const processPayment = async () => {
      try {
        // Simular procesamiento de pago
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Crear la reserva en el backend
        const reservationResponse = await axios.post(
          'http://localhost:8000/api/crear-reserva/',
          {
            ...props.reservationData,
            payment_method: paymentMethod.value,
            payment_amount: totalAmount.value
          }
        );
        
        // Redirigir al panel de usuario
        router.push({ 
          name: 'user-panel',
          params: { 
            reservationId: reservationResponse.data.id 
          }
        });
      } catch (error) {
        console.error('Error al procesar el pago:', error);
        alert('Error al procesar el pago. Por favor, inténtalo de nuevo.');
      }
    };
    
    return {
      paymentMethod,
      cardNumber,
      expiryDate,
      cvv,
      cardName,
      totalAmount,
      formatCardNumber,
      formatExpiryDate,
      formatDate,
      processPayment
    };
  }
};
</script>

<style scoped>
.payment-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f8f9fa;
}

.payment-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.payment-logo {
  max-width: 150px;
  display: block;
  margin: 0 auto 1.5rem;
}

h2 {
  color: #142733;
  margin-bottom: 1.5rem;
  text-align: center;
}

h3 {
  color: #142733;
  margin-bottom: 1rem;
}

.reservation-summary {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #9CBEC2;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
}

.summary-label {
  font-weight: 600;
  color: #142733;
}

.total-row {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
  font-size: 1.2rem;
}

.total-row .summary-value {
  font-weight: 700;
  color: #142733;
}

.payment-methods {
  margin-bottom: 1.5rem;
}

.payment-options {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.payment-option {
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.payment-option.selected {
  border-color: #142733;
  background-color: #f8f9fa;
}

.payment-option-icon {
  font-size: 1.5rem;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.half-width {
  flex: 1;
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

.pay-button {
  background-color: #142733;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s;
  width: 100%;
  margin-top: 1rem;
}

.pay-button:hover {
  background-color: #1a3340;
}

.paypal-button {
  background-color: #0070ba;
}

.paypal-button:hover {
  background-color: #005ea6;
}

.paypal-container {
  text-align: center;
}

.paypal-message {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
}
</style>