const html = document.documentElement;
const boton = document.getElementById('btn-tema');

const guardado = localStorage.getItem('tema');
if (guardado) html.setAttribute('data-bs-theme', guardado);

boton.addEventListener('click', () => {
  const nuevo = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-bs-theme', nuevo);
  localStorage.setItem('tema', nuevo);
});
