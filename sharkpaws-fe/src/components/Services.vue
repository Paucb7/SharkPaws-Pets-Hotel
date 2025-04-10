<template>
    <section class="services">
      <h2>Nuestros Servicios</h2>
      <div class="service-cards">
        <div class="card">
          <h3>🐾 Guardería Premium</h3>
          <p>Espacios climatizados y monitoreo 24/7.</p>
        </div>
        <div class="card">
          <h3>🏥 Atención Veterinaria</h3>
          <p>Vacunación, urgencias y cuidados especiales.</p>
        </div>
        <div class="card">
          <h3>✂️ Estética Canina</h3>
          <p>Baños, cortes de pelo y spa para mascotas.</p>
        </div>
      </div>
    </section>
  </template>
  
  <style scoped>
  .services {
    padding: 4rem 2rem;
    text-align: center;
  }
  .service-cards {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  }
  .card {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 1.5rem;
    width: 300px;
  }
  </style>