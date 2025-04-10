<template>
    <div class="home">
      <Navbar />
      <HeroSection />
      <Services />
      <Testimonials />
      <Footer />
    </div>
  </template>
  
  <script>
  import Navbar from '../components/Navbar.vue';
  import HeroSection from '../components/HeroSection.vue';
  import Services from '../components/Services.vue';
  import Testimonials from '../components/Testimonials.vue';
  import Footer from '../components/Footer.vue';
  
  
  export default {
    name: 'Home',
    components: {
      Navbar,
      HeroSection,
      Services,
      Testimonials,
      Footer
    }
  };
  </script>