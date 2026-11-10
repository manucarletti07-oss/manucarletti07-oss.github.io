// Modo claro/oscuro: cambio data-bs-theme en <html> y guardo la elección en localStorage
const html = document.documentElement;
const boton = document.getElementById('btn-tema');

// Recupero el tema elegido en una visita anterior
const guardado = localStorage.getItem('tema');
if (guardado) html.setAttribute('data-bs-theme', guardado);

// Al pulsar alterno entre claro y oscuro
boton.addEventListener('click', () => {
  const nuevo = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-bs-theme', nuevo);
  localStorage.setItem('tema', nuevo);
});
// Efectos 3D: solo si la persona no ha pedido reducir el movimiento
const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!sinMovimiento) {
  // Inclinación 3D: calculo dónde está el ratón dentro de la tarjeta (de -0,5 a 0,5)
  // y lo convierto en grados de giro en cada eje
  document.querySelectorAll('.tarjeta-proyecto, .habilidad').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transition = 'transform .08s';
      el.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-6px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = '';
      el.style.transform = '';
    });
  });

  // Aparición al hacer scroll: IntersectionObserver avisa cuando un elemento entra en pantalla
  const aparecer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        aparecer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.seccion .titulo-seccion, .seccion .row > [class*="col-"]').forEach((el, i) => {
    el.classList.add('revelar');
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
    aparecer.observe(el);
  });
}
