<template>
  <div class="servicios">
    <h1>Nuestros Servicios</h1>
    
    <div class="servicios-grid">
      <div class="servicio-card">
        <h2>Hospedaje</h2>
        <p>Ofrecemos un ambiente seguro y cómodo para tu mascota mientras estás fuera.</p>
        <ul>
          <li>Espacios individuales</li>
          <li>Áreas de juego</li>
          <li>Monitoreo 24/7</li>
        </ul>
      </div>

      <div class="servicio-card">
        <h2>Baño Premium</h2>
        <p>Servicio de baño completo con productos de alta calidad.</p>
        <ul>
          <li>Baño con shampoo especializado</li>
          <li>Secado profesional</li>
          <li>Cepillado y desenredado</li>
        </ul>
      </div>

      <div class="servicio-card">
        <h2>Corte de Pelo</h2>
        <p>Servicio de peluquería profesional para tu mascota.</p>
        <ul>
          <li>Corte según raza</li>
          <li>Estilizado</li>
          <li>Tratamientos especiales</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Servicios'
}
</script>

<style scoped>
.servicios {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.servicios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.servicio-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.servicio-card:hover {
  transform: translateY(-5px);
}

h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0.5rem 0;
  padding-left: 1rem;
  position: relative;
}

li:before {
  content: "•";
  color: #3498db;
  position: absolute;
  left: 0;
}
</style> 