API
las APIs no pueden recibir objetos nativos de JS directamente.

Finally:
El bloque finally se ejecuta siempre, sin importar si la petición fue exitosa (bloque try) o si ocurrió un error (bloque catch).En el contexto de procesos asincrónicos, es el lugar ideal para apagar el estado de carga (setLoading(false)) por tres razones principales:1. Evita duplicar códigoSi no usaras finally, tendrías que escribir setLoading(false) dos veces: al final del try y al final del catch. Con finally lo escribes una sola vez.

 2. Resuelve el problema de los return anticipados
 En tu hook, notas que tanto dentro del try como del catch usas la palabra return (return data y return null).Cuando una función ejecuta un return, normalmente se detiene inmediatamente y no lee nada de lo que esté abajo. Sin embargo, finally es una excepción especial de JavaScript: el navegador garantiza que el bloque finally se ejecutará justo antes de que la función termine y devuelva el valor del return.Si pusieras el setLoading(false) abajo del bloque catch sin un finally, nunca se ejecutaría en caso de éxito porque el return data rompería la ejecución antes de llegar ahí.
 3. Garantiza que la interfaz no se quede "congelada"
 Si la petición falla y el servidor se cae, el código salta al catch. Si olvidas apagar la carga en el error, el botón de tu formulario se quedará deshabilitado y mostrando "Cargando..." para siempre. El usuario pensará que la app se trabó. Con finally te aseguras al 100% de que la carga se apagará pase lo que pase.

EDICION
put->necesita todos los datos, si no te deja campos en blanco
patch(edicion parcial)-> no se necesitan todos los campos, solo lo que cambio
para mas de 10 registros se necesita loading

timestamp deletedAt y su relacion con softDelete
path params---> se puede acceder de manera global

travel shoting
¿la pag esta en el rooteo?
Query params

useParam es para obtener los parámetros definidos en el path de una ruta definida

burbujeo de eventos
DTO: En el desarrollo de software, DTO corresponde a las siglas en inglés para Data Transfer Object (Objeto de Transferencia de Datos). Es un patrón de diseño utilizado para transportar datos entre diferentes capas de una aplicación (por ejemplo, entre el servidor y la interfaz del cliente) de forma simple, segura y eficiente sin exponer la estructura interna del sistema.

postman:Postman es una plataforma de software diseñada para desarrollar, probar, documentar y gestionar APIs. Funciona como una interfaz visual que permite enviar peticiones a servidores y ver las respuestas en tiempo real, facilitando la identificación de errores sin necesidad de escribir código adicional.

En React, los endpoints son las URLs o rutas en el servidor (API) con las que tu aplicación se comunica para enviar o recibir datos. Se consumen en el cliente utilizando funciones asíncronas como fetch() o librerías HTTP como Axios, disparadas generalmente a través del hoo


Los métodos GET y POST son las dos formas principales que utiliza un navegador para enviar información a un servidor.La diferencia principal radica en dónde viajan los datos y su propósito:GET: Los datos viajan visibles en la propia URL (como parámetros). Se usa principalmente para solicitar o buscar información sin alterar el servidor.POST: Los datos viajan ocultos en el cuerpo (body) de la solicitud HTTP. Se usa para enviar información confidencial o realizar acciones que cambian el estado del servidor (como registrarse o comprar).

el error debe ser de las primeras cosas que se inicializan 
por temas de scoup debe inicializarse y despues armar la func
cuando se quiere enviar info de claves se hace en obj
los obj envian info de forma ordenada
SSO

// Enfoque reutilizable

function Input({ label, value, onChange, labelId, type, isRequired }) {

  return (

    <div>

      <label htmlFor={labelId}> {label} </label>

      <input required={isRequired ? true : false} type={type} value={value} onChange={onChange} id={labelId} name={labelId} />

    </div>

  );

}

export default Input

asincronia:
Los procesos asincrónicos en React son operaciones (como peticiones a APIs, lectura de archivos o temporizadores) que no bloquean la interfaz de usuario mientras se ejecutan. Se gestionan principalmente mediante funciones asíncronas combinadas con el estado local para manejar los datos y mostrar indicadores de carga.
Métodos principales para manejar la asincronía
1. El hook useEffect con async/await
    Es el método nativo más común para ejecutar tareas asíncronas al montar un componente o cuando cambian ciertas dependencias. Se debe definir una función asíncrona dentro del hook y luego ejecutarla, ya que el efecto en sí no puede ser asíncrono.
2. React Suspense
    Introducido para mejorar el renderizado asíncrono. Permite que un componente "espere" a que finalice una operación asíncrona (como cargar datos o componentes diferidos) y muestre un estado de carga (fallback) mientras tanto
3. Librerías de terceros
    Para proyectos medianos o grandes, es común delegar el manejo de estados de carga, caché y reintentos a librerías optimizadas como TanStack Query (anteriormente React Query) o SWR.

----- EJEMPLO:

    import React, { useState, useEffect } from 'react';

function MiComponenteAsincronico() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Declarar la función asíncrona interna
    const obtenerDatos = async () => {
      try {
        const respuesta = await fetch('https://example.com');
        if (!respuesta.ok) throw new Error('Error en la petición');
        
        const resultado = await respuesta.json();
        setDatos(resultado); // 2. Actualizar el estado con los datos
      } catch (err) {
        setError(err.message); // 3. Manejar posibles errores
      } finally {
        setCargando(false); // 4. Ocultar el indicador de carga
      }
    };

    obtenerDatos(); // Ejecutar la función
  }, []); // Array vacío para que solo se ejecute al montar el componente

  if (cargando) return <p>Cargando información...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Datos obtenidos:</h1>
      <pre>{JSON.stringify(datos, null, 2)}</pre>
    </div>
  );
}

FallBacks:
Los fallbacks (o estados de reserva) son interfaces visuales alternativas que se muestran al usuario mientras una operación asíncrona está en proceso de carga o si ocurre un fallo.En React, su objetivo principal es mejorar la experiencia de usuario (UX) evitando pantallas en blanco o interfaces rotas.
Tipos de Fallbacks en React
1. Fallback de Carga (Loading Fallback)
Es la interfaz que se renderiza mientras los datos o el código de un componente se están descargando.Componente nativo: Se utiliza con <Suspense>.Ejemplos comunes: Spinners, barras de progreso o esqueletos de carga (skeletons).
2. Fallback de Error (Error Fallback)
Es la interfaz que se muestra cuando un componente falla debido a un error de código en tiempo de ejecución.Componente nativo: Se utiliza con Error Boundaries (Límites de errores).Ejemplos comunes: Mensajes de "Algo salió mal", botones para reintentar o desvíos a la página de inicio.
Cómo implementarlos en código
Ejemplo 1: Fallback de Carga con <Suspense> React Suspense captura los componentes que están suspendidos (esperando datos o carga diferida) y muestra el contenido de la propiedad fallback.

Cargando:
import React, { Suspense, lazy } from 'react';

// Carga diferida del componente (Lazy loading)
const PerfilUsuario = lazy(() => import('./PerfilUsuario'));

function App() {
  return (
    <div>
      <h1>Panel de Control</h1>
      {/* El fallback se muestra mientras PerfilUsuario se descarga */}
      <Suspense fallback={<p>Cargando perfil del usuario...</p>}>
        <PerfilUsuario />
      </Suspense>
    </div>
  );
}
Error:
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary'; // Librería estándar recomendada

function MiFallbackDeError({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Hubo un problema al cargar esta sección:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Intentar de nuevo</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={MiFallbackDeError}>
      <MiComponentePropensoAErrores />
    </ErrorBoundary>
  );
}

useEffect
el useEffect va a administrar la ejecucion nos va a ayudar cuando ejecutemos o leamos el hook en un componentese va a hacer e llamado a la api. Hace que cuando un usuario entre a una de nuestras pags no tenga que realizar ninguna accion para ver lo que busca











