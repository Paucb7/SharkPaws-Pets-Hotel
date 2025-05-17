<template>
  <div class="user-panel-container">
    <div class="user-panel-sidebar">
      <img src="../assets/logo-sharkpaws.png" alt="SharkPaws Logo" class="panel-logo">
      <div class="user-info">
        <h3>{{ authStore.user?.name || 'Usuario' }}</h3>
        <p>{{ authStore.user?.email }}</p>
      </div>
      
      <div class="menu-items">
        <div 
          class="menu-item" 
          :class="{ active: activeTab === 'reservations' }" 
          @click="activeTab = 'reservations'"
        >
          <span class="menu-icon">📅</span>
          <span>Mis Reservaciones</span>
        </div>
        <div 
          class="menu-item" 
          :class="{ active: activeTab === 'reports' }" 
          @click="activeTab = 'reports'"
        >
          <span class="menu-icon">📋</span>
          <span>Reportes Veterinarios</span>
        </div>
        <div 
          class="menu-item" 
          :class="{ active: activeTab === 'pets' }" 
          @click="activeTab = 'pets'"
        >
          <span class="menu-icon">🐾</span>
          <span>Mis Mascotas</span>
        </div>
      </div>
      
      <div class="sidebar-footer">
        <button @click="logout" class="logout-button">
          <span class="menu-icon">🚪</span>
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
    
    <div class="user-panel-content">
      <!-- Tab de Reservaciones -->
      <div v-if="activeTab === 'reservations'" class="panel-tab">
        <h2>Mis Reservaciones</h2>
        
        <div class="new-reservation">
          <router-link to="/reservas" class="new-reservation-button">
            <span>Nueva reserva</span>
          </router-link>
        </div>
        
        <div v-if="loading" class="loading-indicator">
          Cargando reservaciones...
        </div>
        
        <div v-else-if="reservations.length === 0" class="empty-state">
          <div class="empty-icon">🔍</div>
          <p>No tienes reservaciones activas</p>
          <router-link to="/reservas" class="empty-action-button">
            Hacer una reserva
          </router-link>
        </div>
        
        <div v-else class="reservations-list">
          <div v-for="(reservation, index) in reservations" :key="index" class="reservation-card">
            <div class="reservation-header">
              <h3>Reserva #{{ reservation.id }}</h3>
              <span class="status-badge" :class="getStatusClass(reservation.status)">
                {{ getStatusText(reservation.status) }}
              </span>
            </div>
            
            <div class="reservation-details">
              <div class="detail-item">
                <span class="detail-label">Mascota:</span>
                <span class="detail-value">{{ reservation.petName }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Ingreso:</span>
                <span class="detail-value">{{ formatDate(reservation.startDate) }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Salida:</span>
                <span class="detail-value">{{ formatDate(reservation.endDate) }}</span>
              </div>
              <div class="detail-item" v-if="reservation.services && reservation.services.length">
                <span class="detail-label">Servicios:</span>
                <span class="detail-value">{{ reservation.services.join(', ') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tab de Reportes Veterinarios -->
      <div v-if="activeTab === 'reports'" class="panel-tab">
        <h2>Reportes Veterinarios</h2>
        
        <div v-if="loading" class="loading-indicator">
          Cargando reportes...
        </div>
        
        <div v-else-if="reports.length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <p>No hay reportes veterinarios disponibles</p>
        </div>
        
        <div v-else class="reports-list">
          <div v-for="(report, index) in reports" :key="index" class="report-card">
            <div class="report-header">
              <h3>{{ report.petName }}</h3>
              <span class="report-date">{{ formatDate(report.date) }}</span>
            </div>
            
            <div class="report-details">
              <p class="report-vet"><strong>Veterinario:</strong> {{ report.veterinarian }}</p>
              <div class="report-content">
                <p>{{ report.content }}</p>
              </div>
              
              <div v-if="report.medications && report.medications.length" class="report-medications">
                <h4>Medicamentos recetados:</h4>
                <ul>
                  <li v-for="(med, i) in report.medications" :key="i">
                    {{ med.name }} - {{ med.instructions }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tab de Mascotas -->
      <div v-if="activeTab === 'pets'" class="panel-tab">
        <h2>Mis Mascotas</h2>
        
        <div v-if="loading" class="loading-indicator">
          Cargando mascotas...
        </div>
        
        <div v-else-if="pets.length === 0" class="empty-state">
          <div class="empty-icon">🐾</div>
          <p>No tienes mascotas registradas</p>
          <p class="empty-description">Las mascotas se agregan automáticamente cuando haces una reserva</p>
        </div>
        
        <div v-else class="pets-grid">
          <div v-for="(pet, index) in pets" :key="index" class="pet-card">
            <div class="pet-icon">{{ getPetEmoji(pet.type) }}</div>
            <h3>{{ pet.name }}</h3>
            <div class="pet-details">
              <div class="pet-detail">
                <span class="detail-label">Tipo:</span>
                <span>{{ capitalizeFirstLetter(pet.type) }}</span>
              </div>
              <div class="pet-detail" v-if="pet.breed">
                <span class="detail-label">Raza:</span>
                <span>{{ pet.breed }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';

export default {
  name: 'UserPanelView',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    
    // Estado de la interfaz y datos
    const activeTab = ref('reservations');
    const loading = ref(true);
    
    const reservations = ref([]);
    const reports = ref([]);
    const pets = ref([]);
    
    // Cargar datos del usuario
    const loadUserData = async () => {
      loading.value = true;
      
      try {
        // Simular carga de datos desde la API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Ejemplo de datos de reservas
        reservations.value = [
          {
            id: 1001,
            petName: 'Max',
            startDate: '2025-05-20',
            endDate: '2025-05-25',
            services: ['baño', 'corte'],
            status: 'confirmed'
          },
          {
            id: 1002,
            petName: 'Luna',
            startDate: '2025-06-10',
            endDate: '2025-06-15',
            services: ['baño'],
            status: 'completed'
          }
        ];
        
        // Ejemplo de datos de reportes veterinarios
        reports.value = [
          {
            petName: 'Max',
            date: '2025-05-23',
            veterinarian: 'Dr. Carlos Rodríguez',
            content: 'La mascota presenta buen estado de salud general. Se realizó revisión de rutina sin complicaciones. Comportamiento normal durante su estancia.',
            medications: [
              { name: 'Vitaminas caninas', instructions: '1 tableta diaria con alimento' }
            ]
          },
          {
            petName: 'Luna',
            date: '2025-06-12',
            veterinarian: 'Dra. Ana Martínez',
            content: 'Se realizó baño higiénico sin complicaciones. La mascota presenta ligera ansiedad por separación, pero ha mejorado durante su estancia.',
            medications: []
          }
        ];
        
        // Ejemplo de datos de mascotas
        pets.value = [
          {
            name: 'Max',
            type: 'perro',
            breed: 'Golden Retriever'
          },
          {
            name: 'Luna',
            type: 'gato',
            breed: 'Siamés'
          }
        ];
        
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
      } finally {
        loading.value = false;
      }
    };
    
    // Formatear fecha
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    };
    
    // Obtener clase CSS según el estado de la reserva
    const getStatusClass = (status) => {
      const statusMap = {
        'pending': 'status-pending',
        'confirmed': 'status-confirmed',
        'completed': 'status-completed',
        'cancelled': 'status-cancelled'
      };
      
      return statusMap[status] || 'status-pending';
    };
    
    // Obtener texto en español según el estado de la reserva
    const getStatusText = (status) => {
      const statusMap = {
        'pending': 'Pendiente',
        'confirmed': 'Confirmada',
        'completed': 'Completada',
        'cancelled': 'Cancelada'
      };
      
      return statusMap[status] || 'Pendiente';
    };
    
    // Obtener emoji según el tipo de mascota
    const getPetEmoji = (type) => {
      const emojiMap = {
        'perro': '🐕',
        'gato': '🐱',
        'ave': '🦜',
        'reptil': '🦎',
        'roedor': '🐹',
        'conejo': '🐰'
      };
      
      return emojiMap[type] || '🐾';
    };
    
    // Capitalizar primera letra
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    
    // Cerrar sesión
    const logout = () => {
      authStore.logout();
      router.push('/');
    };
    
    onMounted(() => {
      if (!authStore.isAuthenticated) {
        router.push('/login');
        return;
      }
      
      loadUserData();
    });
    
    return {
      activeTab,
      loading,
      reservations,
      reports,
      pets,
      authStore,
      formatDate,
      getStatusClass,
      getStatusText,
      getPetEmoji,
      capitalizeFirstLetter,
      logout
    };
  }
};
</script>

<style scoped>
.user-panel-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.user-panel-sidebar {
  width: 250px;
  background-color: #142733;
  color: white;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
}

.user-panel-content {
  flex: 1;
  padding: 2rem;
  margin-left: 250px;
}

.panel-logo {
  width: 120px;
  margin: 0 auto 1.5rem;
  display: block;
}

.user-info {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info h3 {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
}

.user-info p {
  opacity: 0.7;
  margin: 0;
  font-size: 0.9rem;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-item.active {
  background-color: rgba(255, 255, 255, 0.15);
}

.menu-icon {
  font-size: 1.2rem;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.panel-tab {
  max-width: 900px;
  margin: 0 auto;
}

h2 {
  color: #142733;
  margin-bottom: 1.5rem;
}

.new-reservation {
  margin-bottom: 1.5rem;
}

.new-reservation-button {
  display: inline-block;
  background-color: #142733;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.new-reservation-button:hover {
  background-color: #1a3340;
}

.loading-indicator {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-state p {
  margin-bottom: 1rem;
  color: #6c757d;
}

.empty-description {
  font-size: 0.9rem;
  opacity: 0.7;
}

.empty-action-button {
  display: inline-block;
  background-color: #142733;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
  transition: background-color 0.2s;
}

.empty-action-button:hover {
  background-color: #1a3340;
}

.reservations-list, .reports-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.reservation-card, .report-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.reservation-header, .report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.reservation-header h3, .report-header h3 {
  margin: 0;
  color: #142733;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-pending {
  background-color: #ffc107;
  color: #212529;
}

.status-confirmed {
  background-color: #0dcaf0;
  color: #212529;
}

.status-completed {
  background-color: #198754;
  color: white;
}

.status-cancelled {
  background-color: #dc3545;
  color: white;
}

.reservation-details, .report-details {
  color: #495057;
}

.detail-item {
  margin-bottom: 0.5rem;
}

.detail-label {
  font-weight: 600;
  color: #142733;
  margin-right: 0.5rem;
}

.report-date {
  color: #6c757d;
  font-size: 0.9rem;
}

.report-vet {
  margin-top: 0;
  color: #6c757d;
}

.report-content {
  margin: 1rem 0;
  line-height: 1.6;
}

.report-medications {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
}

.report-medications h4 {
  margin-top: 0;
  font-size: 1rem;
  color: #142733;
}

.report-medications ul {
  margin: 0.5rem 0 0;
  padding-left: 1.25rem;
}

.pets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.pet-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.pet-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.pet-card h3 {
  margin: 0 0 1rem;
  color: #142733;
}

.pet-details {
  text-align: left;
}

.pet-detail {
  margin-bottom: 0.5rem;
  color: #495057;
}

@media (max-width: 768px) {
  .user-panel-container {
    flex-direction: column;
  }
  
  .user-panel-sidebar {
    width: 100%;
    height: auto;
    position: relative;
    padding: 1rem;
  }
  
  .user-panel-content {
    margin-left: 0;
  }
  
  .panel-logo {
    width: 100px;
  }
  
  .menu-items {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
  
  .menu-item {
    white-space: nowrap;
  }
  
  .pets-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>