// Modo claro/oscuro. Bootstrap 5.3 ya incluye los dos temas: solo hay que cambiar
// el atributo data-bs-theme de <html>, y mis variables CSS hacen el resto.
const html = document.documentElement;
const boton = document.getElementById('btn-tema');

// Si la persona ya eligió tema en una visita anterior, lo recupero al cargar.
// localStorage guarda el dato en el navegador y no necesita servidor.
const guardado = localStorage.getItem('tema');
if (guardado) html.setAttribute('data-bs-theme', guardado);

// Al pulsar el botón alterno entre claro y oscuro y guardo la elección.
boton.addEventListener('click', () => {
  const nuevo = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-bs-theme', nuevo);
  localStorage.setItem('tema', nuevo);
});
