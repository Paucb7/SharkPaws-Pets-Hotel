<template>
  <div class="contacto">
    <h1>Contacto</h1>
    
    <div class="contacto-container">
      <div class="info-contacto">
        <div class="logo-container">
          <img src="../assets/logo-sharkpaws-no-font.png" alt="SharkPaws Logo" class="contact-logo">
        </div>
        <h2>Información de Contacto</h2>
        <div class="info-item">
          <i class="fas fa-map-marker-alt"></i>
          <p>Av. de las Americas 123, Providencia, 44630, Guadalajara, Jalisco, México</p>
        </div>
        <div class="info-item">
          <i class="fas fa-phone"></i>
          <p>+52 33 1234 5678</p>
        </div>
        <div class="info-item">
          <i class="fas fa-envelope"></i>
          <p>sharkpaws@gmail.com</p>
        </div>
        <div class="info-item">
          <i class="fas fa-clock"></i>
          <p>Horario de atención</p>
          <p>Lunes a Viernes: 9:00 - 19:00</p>
          <p>Sábados: 9:00 - 14:00</p>
        </div>
      </div>

      <div class="formulario-contacto">
        <h2>Envíanos un Mensaje</h2>
        <form @submit.prevent="enviarMensaje">
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" v-model="form.nombre" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required>
          </div>
          <div class="form-group">
            <label for="mensaje">Mensaje</label>
            <textarea id="mensaje" v-model="form.mensaje" required></textarea>
          </div>
          <button type="submit" class="btn-enviar">Enviar Mensaje</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contacto',
  data() {
    return {
      form: {
        nombre: '',
        email: '',
        mensaje: ''
      }
    }
  },
  methods: {
    enviarMensaje() {
      // Aquí iría la lógica para enviar el mensaje
      alert('Mensaje enviado correctamente');
      this.form = {
        nombre: '',
        email: '',
        mensaje: ''
      };
    }
  }
}
</script>

<style scoped>
.contacto {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.contacto-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.info-contacto, .formulario-contacto {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.info-item i {
  margin-right: 1rem;
  color: #3498db;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

input, textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  height: 150px;
  resize: vertical;
}

.btn-enviar {
  background-color: #142733;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-enviar:hover {
  background-color: #1a3340;
}

@media (max-width: 768px) {
  .contacto-container {
    grid-template-columns: 1fr;
  }
}

.logo-container {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.contact-logo {
  max-width: 150px;
  height: auto;
  filter: none; /* Quitamos el filtro para ver el logo con sus colores originales */
  opacity: 1;
}

.info-contacto {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  border-top: 4px solid #9CBEC2;
}

.info-contacto::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #9CBEC2, #142733);
}
</style> 