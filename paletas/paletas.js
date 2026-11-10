// Recupero el tema (claro/oscuro) elegido en el portfolio
const temaGuardado = localStorage.getItem('tema');
if (temaGuardado) document.documentElement.setAttribute('data-bs-theme', temaGuardado);

const paleta = document.getElementById('paleta');
const aviso = document.getElementById('aviso');

// Estado: 5 colores, cada uno con su código y si está fijado
const colores = Array.from({ length: 5 }, () => ({ hex: '#000000', fijo: false }));

// Color aleatorio en hexadecimal: número entre 0 y 16777215 pasado a base 16 con 6 dígitos
function aleatorio() {
  return '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0');
}

// Elige texto claro u oscuro según la luminosidad del fondo, para mantener el contraste
function colorTexto(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? '#111111' : '#ffffff';
}

function copiar(hex) {
  navigator.clipboard.writeText(hex)
    .then(() => { aviso.textContent = 'Copiado ' + hex.toUpperCase(); })
    .catch(() => { aviso.textContent = 'No se pudo copiar el código.'; });
}

// Dibuja las 5 muestras a partir del estado
function pintar() {
  paleta.innerHTML = '';
  colores.forEach((c) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md';

    const muestra = document.createElement('div');
    muestra.className = 'muestra';
    muestra.style.background = c.hex;
    muestra.style.color = colorTexto(c.hex);

    const boton = document.createElement('button');
    boton.className = 'muestra-hex';
    boton.textContent = c.hex.toUpperCase();
    boton.setAttribute('aria-label', 'Copiar color ' + c.hex);
    boton.addEventListener('click', () => copiar(c.hex));

    const candado = document.createElement('button');
    candado.className = 'muestra-candado';
    candado.setAttribute('aria-label', c.fijo ? 'Desbloquear color' : 'Fijar color');
    candado.setAttribute('aria-pressed', c.fijo);
    candado.innerHTML = '<i class="bi bi-' + (c.fijo ? 'lock-fill' : 'unlock') + '"></i>';
    candado.addEventListener('click', () => {
      c.fijo = !c.fijo;
      pintar();
    });

    muestra.append(boton, candado);
    col.append(muestra);
    paleta.append(col);
  });
}

// Solo cambian los colores que no están fijados
function generar() {
  colores.forEach((c) => { if (!c.fijo) c.hex = aleatorio(); });
  pintar();
}

document.getElementById('btn-generar').addEventListener('click', generar);

// Barra espaciadora: solo si no hay un botón con el foco, para no duplicar su acción
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && document.activeElement === document.body) {
    e.preventDefault();
    generar();
  }
});

generar();
