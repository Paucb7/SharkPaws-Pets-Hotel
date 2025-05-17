// Archivo para simular respuestas de API para desarrollo
import axios from 'axios';
import { useAuthStore } from './stores/auth';

// ID para simular respuestas únicas
let currentId = 1;

// Mock data
const users = [
  {
    id: 1,
    name: 'Usuario Demo',
    email: 'demo@sharkpaws.com',
    password: 'password123'
  }
];

const pets = [];
const reservations = [];
const reports = [];

// Simulamos interceptores de axios para desarrollo
export function setupMockAPI() {
  // Interceptor para solicitudes
  axios.interceptors.request.use(
    config => {
      const authStore = useAuthStore();
      
      // Añadir token de autenticación si existe
      if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
      }
      
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // Interceptor para respuestas
  axios.interceptors.response.use(
    response => response,
    error => {
      // Si el error es real (ej. problemas de red) lo dejamos pasar
      if (error.request && !error.response) {
        return Promise.reject(error);
      }
      
      // De lo contrario simulamos respuestas para desarrollo
      const { url, method, data } = error.config;
      
      // Parseamos el body si existe
      const requestData = data ? JSON.parse(data) : {};
      
      // Login/registro simulado
      if (url.includes('/api/login')) {
        const { email, password } = requestData;
        const user = users.find(u => u.email === email);
        
        if (user && user.password === password) {
          return Promise.resolve({
            data: {
              user: { id: user.id, name: user.name, email: user.email },
              token: 'fake-jwt-token-' + user.id
            }
          });
        } else {
          return Promise.reject({
            response: {
              status: 401,
              data: { message: 'Credenciales incorrectas' }
            }
          });
        }
      }
      
      if (url.includes('/api/register')) {
        const { name, email, password } = requestData;
        
        if (users.some(u => u.email === email)) {
          return Promise.reject({
            response: {
              status: 400,
              data: { message: 'El email ya está registrado' }
            }
          });
        }
        
        const newUser = {
          id: users.length + 1,
          name,
          email,
          password
        };
        
        users.push(newUser);
        
        return Promise.resolve({
          data: {
            user: { id: newUser.id, name: newUser.name, email: newUser.email },
            token: 'fake-jwt-token-' + newUser.id
          }
        });
      }
      
      if (url.includes('/api/crear-mascota')) {
        const { nombre, tipo, usuario_id } = requestData;
        
        const newPet = {
          id: pets.length + 1,
          name: nombre,
          type: tipo,
          userId: usuario_id
        };
        
        pets.push(newPet);
        
        return Promise.resolve({
          data: newPet
        });
      }
      
      if (url.includes('/api/crear-reserva')) {
        const { mascota_id, fecha_inicio, fecha_fin, servicios, usuario_id, detalles_pago } = requestData;
        
        const newReservation = {
          id: reservations.length + 1,
          petId: mascota_id,
          userId: usuario_id,
          startDate: fecha_inicio,
          endDate: fecha_fin,
          services: servicios,
          paymentDetails: detalles_pago,
          status: 'active',
          createdAt: new Date().toISOString()
        };
        
        reservations.push(newReservation);
        
        return Promise.resolve({
          data: newReservation
        });
      }
      
      // Si llegamos aquí es que no hay un mock para esta solicitud
      return Promise.reject(error);
    }
  );
}
