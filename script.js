/* ── Mobile menu ── */
document.addEventListener('DOMContentLoaded', function() {
  const burger = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (burger && mobileMenu) {
    burger.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ── Formulario de contacto (Formspree) ── */
  const form = document.getElementById('contact-form');
  const msgDiv = document.getElementById('form-msg');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Enviando...';
      
      const formData = new FormData(form);
      
      try {
        const response = await fetch('https://formspree.io/f/mzzpzwlj', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });
        
        if (response.ok) {
          msgDiv.style.display = 'block';
          msgDiv.style.background = '#E3F2FD';
          msgDiv.style.color = '#1E88E5';
          msgDiv.innerHTML = '✅ Mensaje enviado. Te contactaremos pronto.';
          form.reset();
          setTimeout(() => { msgDiv.style.display = 'none'; }, 5000);
        } else {
          throw new Error('Error en el envío');
        }
      } catch (error) {
        msgDiv.style.display = 'block';
        msgDiv.style.background = '#FFE8E6';
        msgDiv.style.color = '#B33';
        msgDiv.innerHTML = '❌ Error al enviar. Intenta de nuevo o escríbenos a contacto@patitas.cl';
        setTimeout(() => { msgDiv.style.display = 'none'; }, 5000);
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
    });
  }

  /* ── Animación de entrada (Intersection Observer) ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.servicio-card, .contact-item, .tray-item').forEach(el => {
    observer.observe(el);
  });
});