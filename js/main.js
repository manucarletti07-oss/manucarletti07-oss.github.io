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
