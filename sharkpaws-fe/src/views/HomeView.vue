<template>
  <div class="home">
    <div class="hero">
      <img src="../assets/logo-sharkpaws.png" alt="SharkPaws Logo" class="logo">
      <h1>Bienvenido a SharkPaws</h1>
      <p>El mejor lugar para el cuidado de tu mascota</p>
      <router-link to="/reservas" class="cta-button">Reservar Ahora</router-link>
    </div>

    <div class="features">
      <div class="feature-card">
        <h2>Hospedaje Premium</h2>
        <p>Espacios cómodos y seguros para tu mascota</p>
      </div>
      <div class="feature-card">
        <h2>Servicios Profesionales</h2>
        <p>Baño, corte y cuidado especializado</p>
      </div>
      <div class="feature-card">
        <h2>Atención 24/7</h2>
        <p>Monitoreo constante y cuidado personalizado</p>
      </div>
    </div>

    <div class="testimonials">
      <h2>Lo que dicen nuestros clientes</h2>
      <div class="testimonial-grid">
        <div class="testimonial-card">
          <img src="../assets/client1.jpg" alt="Cliente 1">
          <p>"Excelente servicio y atención"</p>
        </div>
        <div class="testimonial-card">
          <img src="../assets/client2.jpg" alt="Cliente 2">
          <p>"Mi mascota Lola está feliz aquí, 100% recomendado"</p>
        </div>
        <div class="testimonial-card">
          <img src="../assets/client3.jpg" alt="Cliente 3">
          <p>"Profesionales y amables, mi perro se divierte mucho"</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  min-height: calc(100vh - 60px);
  padding: 2rem;
  background-color: #f5f5f5;
}

.hero {
  text-align: center;
  padding: 4rem 2rem;
  background-color: #9CBEC2;
  color: #142733;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logo {
  max-width: 200px;
  margin-bottom: 2rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #142733;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #142733;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #142733;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #1a3340;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature-card h2 {
  color: #142733;
  margin-bottom: 1rem;
}

.testimonials {
  margin-top: 4rem;
  text-align: center;
}

.testimonials h2 {
  color: #142733;
  margin-bottom: 2rem;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.testimonial-card img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
  object-fit: cover;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }
  
  .hero p {
    font-size: 1.2rem;
  }

  .logo {
    max-width: 150px;
  }
}
</style> 