// Se define la base de la URL de la API de GitHub
const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;

// Corrijo '.' para seleccionar elementos por clase correctamente
const $n = document.querySelector('.name');   // antes 'name' 
const $b = document.querySelector('.blog');   
const $l = document.querySelector('.location'); // no estaba definido en HTML y he agregado <p class="location"></p>

// Agrego verificación por si no encuentra los elementos (buen hábito)
if (!$n || !$b || !$l) {
  console.error('Faltan elementos en el DOM. Revisa que .name, .blog y .location existan en el HTML.');
}

// Agrego 'async' para poder usar 'await' dentro de esta función
async function displayUser(username) {

  // Texto temporal mientras carga la info
  $n.textContent = 'Cargando...';

  try {
    // 'await' sólo puede usarse dentro de funciones async
    const response = await fetch(`${usersEndpoint}/${username}`);

    // Verifico que la respuesta sea exitosa
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    // Obtengo el JSON de la respuesta
    const data = await response.json();

    // Muestro los datos en consola para verificar
    console.log(data);

    // He usado backticks (`) en lugar de comillas simples para interpolar variables
    $n.textContent = `${data.name}`;
    $b.textContent = `${data.blog}`;
    $l.textContent = `${data.location}`;
  } catch (err) {
    // En caso de error
    handleError(err);
  }
}

// Manejo de errores
function handleError(err) {
  console.log('OH NO!');
  console.log(err);

  // Uso de '$n' que es la variable definida correctamente. Antes se usaba 'n' que no existía.
  $n.textContent = `Algo salió mal: ${err.message}`;
}

// Ejecuto la función con un usuario de prueba
displayUser('stolinski');
