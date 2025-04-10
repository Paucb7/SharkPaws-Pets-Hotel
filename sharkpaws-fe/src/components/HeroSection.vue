<template>
    <section class="hero">
      <div class="hero-content">
        <h1>El mejor cuidado para tu mascota</h1>
        <p>Hotel y guardería premium en Guadalajara con atención veterinaria 24/7</p>
        <button class="cta-button" @click="$router.push('/reservations')">
  Reservar Ahora
</button>
      </div>
    </section>
  </template>

  <script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const navigateToReservations = () => {
    router.push('../Reservations');
  };
  </script>  
  <style scoped>
  .hero {
    background: url('../assets/hero-image-sharkpaws.png') no-repeat center center;
    background-size: cover;
    height: 70vh;
    display: flex;
    align-items: center;
    text-align: center;
    color: #142733;
  }
  .hero-content {
    margin: 0 auto;
    max-width: 800px;
  }
  .cta-button {
    background-color: #ff6b6b;
    color: white;
    border: none;
    padding: 12px 30px;
    font-size: 1.2rem;
    border-radius: 25px;
    cursor: pointer;
  }
  </style>