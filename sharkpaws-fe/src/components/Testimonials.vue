<template>
    <section class="testimonials">
      <h2>Lo que dicen nuestros clientes</h2>
      <div class="testimonial-cards">
        <div class="testimonial-card">
          <div class="quote">“Mi perro Max siempre vuelve feliz y relajado. ¡El mejor servicio!”</div>
          <div class="author">
            <img src="../assets/client1.jpg" alt="Cliente 1" class="avatar">
            <p>Ana Martínez</p>
          </div>
        </div>
        
        <div class="testimonial-card">
          <div class="quote">“Los veterinarios son increíbles. Mi gata Luna recibió atención de urgencia a medianoche.”</div>
          <div class="author">
            <img src="../assets/client2.jpg" alt="Cliente 2" class="avatar">
            <p>Carlos Rodríguez</p>
          </div>
        </div>
        
        <div class="testimonial-card">
          <div class="quote">“Las actualizaciones diarias con fotos me dan paz mental cuando viajo.”</div>
          <div class="author">
            <img src="../assets/client3.jpg" alt="Cliente 3" class="avatar">
            <p>María González</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <style scoped>
  .testimonials {
    padding: 4rem 1rem;
    text-align: center;
    background-color: #f9f9f9;
  }
  
  .testimonials h2 {
    margin-bottom: 2rem;
    color: #2c3e50;
  }
  
  .testimonial-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .testimonial-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    width: 300px;
    transition: transform 0.3s;
  }
  
  .testimonial-card:hover {
    transform: translateY(-5px);
  }
  
  .quote {
    font-style: italic;
    margin-bottom: 1rem;
    color: #555;
  }
  
  .author {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .author p {
    margin: 0;
    font-weight: bold;
    color: #2c3e50;
  }
  </style>