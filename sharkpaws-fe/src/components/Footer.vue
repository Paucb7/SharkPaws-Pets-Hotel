<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>SharkPaws</h3>
          <p>El mejor lugar para el cuidado de tu mascota</p>
          <div class="social-icons">
            <a href="#" class="social-icon">
              <img src="../assets/facebook-icon.png" alt="Facebook">
            </a>
            <a href="#" class="social-icon">
              <img src="../assets/instagram-icon.png" alt="Instagram">
            </a>
            <a href="#" class="social-icon">
              <img src="../assets/tiktok-icon.png" alt="TikTok">
            </a>
          </div>
        </div>
        
        <div class="footer-section">
          <h3>Contacto</h3>
          <p><i class="fas fa-map-marker-alt"></i> Av. de las Americas 123, Providencia, 44630, Guadalajara, Jalisco, México</p>
          <p><i class="fas fa-phone"></i> +52 33 1234 5678</p>
          <p><i class="fas fa-envelope"></i> sharkpaws@gmail.com</p>
        </div>
        
        <div class="footer-section">
          <h3>Horario</h3>
          <p>Lunes a Viernes: 8:00 - 20:00</p>
          <p>Sábados: 8:00 - 16:00</p>
          <p>Domingos: 8:00 - 14:00</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 SharkPaws. Todos los derechos reservados.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  }
  </script>
  
  <style scoped>
  .footer {
    background-color: #142733;
    color: white;
    padding: 3rem 2rem 1rem;
    margin-top: auto;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .footer-section {
    margin-bottom: 2rem;
  }
  
  .footer-section h3 {
    color: #9CBEC2;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  .footer-section p {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .social-icons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .social-icon {
    width: 32px;
    height: 32px;
    transition: transform 0.3s;
  }
  
  .social-icon:hover {
    transform: scale(1.1);
  }
  
  .social-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .footer-bottom {
    text-align: center;
    padding-top: 2rem;
    margin-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    .footer {
      padding: 2rem 1rem;
    }
    
    .footer-content {
      grid-template-columns: 1fr;
    }
  }
  </style>