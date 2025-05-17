import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';  // Importa el router
import { setupMockAPI } from './mockAPI';  // Importar la configuración de mock API

const app = createApp(App);
const pinia = createPinia();

app.use(router);  // Usa el router
app.use(pinia);   // Usa Pinia para state management

// Configurar el mock API para desarrollo (simulación del backend)
setupMockAPI();

app.mount('#app');