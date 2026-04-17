const btnLanzarModal = document.querySelector('#contact-button');
const btnOcultarModal = document.querySelector('#submit-button');
const cerrarModal = document.querySelector('#cerrarmodal'); 
const contModal = document.querySelector('.contenedor-modal');

// Inputs
const nombreInput = document.querySelector('#name-input');
const puestoInput = document.querySelector('#lastname-input');
const emailInput = document.querySelector('#email-input');
const mensajeInput = document.querySelector('#message-input');

// Función para cerrar el modal
const cerrar = () => {
    contModal.classList.remove('mostrar');
};

// 1. Abrir Modal
btnLanzarModal.addEventListener('click', (e) => {
    e.preventDefault();
    contModal.classList.add('mostrar');
});

// 2. Cerrar al hacer clic en la X (Usando la variable cerrarModal)
cerrarModal.addEventListener('click', cerrar);

// 3. Cerrar al hacer clic fuera de la caja blanca
window.addEventListener('click', (e) => {
    if (e.target === contModal) {
        cerrar();
    }
});

// 4. Procesar Datos y cerrar al enviar
btnOcultarModal.addEventListener('click', (e) => {
    e.preventDefault();
    
    const empleado = document.querySelector('.contenedor');

    const pNombre = document.createElement('p');
    pNombre.textContent = `Nombre: ${nombreInput.value}`;

    const pPuesto = document.createElement('p');
    pPuesto.textContent = `Apellido: ${puestoInput.value}`;

    const pEmail = document.createElement('p');
    pEmail.textContent = `Email: ${emailInput.value}`;

    const pMensaje = document.createElement('p');
    pMensaje.textContent = `Mensaje: ${mensajeInput.value}`;

    empleado.appendChild(pNombre);
    empleado.appendChild(pPuesto);
    empleado.appendChild(pEmail);
    empleado.appendChild(pMensaje);

    // Limpiar campos
    nombreInput.value = '';
    puestoInput.value = '';
    emailInput.value = '';
    mensajeInput.value = '';

    // Cerramos el modal
    cerrar();
});