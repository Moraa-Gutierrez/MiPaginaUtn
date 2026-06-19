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













