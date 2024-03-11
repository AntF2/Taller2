$('#modoBtn').click(function () {
    $('body').toggleClass('dark-mode');
    if ($('body').hasClass('dark-mode')) {
        $('#modoBtn img').attr('src', 'https://cdn-icons-png.flaticon.com/512/5261/5261906.png');
    } else {
        $('#modoBtn img').attr('src', 'https://cdn-icons-png.flaticon.com/512/5261/5261906.png');
    }
});

/*Para el carrito*/

const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const elementos2 = document.getElementById('lista-2');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners(){
    elementos1.addEventListener('click', comprarElemento);
    elementos2.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento){
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${elemento.imagen}" width=100 >
    </td>
    <td>
        ${elemento.titulo}
    </td>
    <td>
        ${elemento.precio}
    </td>   
    <td>
        <a href="#" class="borrar" data-id="${elemento.id}">X</a>
    </td>
    `;
    lista.appendChild(row);

    // Actualizar el total del carrito
    const totalCarrito = sumarTotalCarrito();
    document.getElementById('total-carrito').textContent = `$${totalCarrito.toFixed(2)}`;
}


function eliminarElemento(e) {
    e.preventDefault();

    let elementoId;

    if (e.target.classList.contains('borrar')) {
        const elementoPadre = e.target.parentElement.parentElement;
        elementoId = elementoPadre.querySelector('a').getAttribute('data-id');
        
        elementoPadre.remove();

        // Actualizar el total del carrito después de eliminar el elemento
        const totalCarrito = sumarTotalCarrito();
        document.getElementById('total-carrito').textContent = `$${totalCarrito.toFixed(2)}`;
    }
}



function vaciarCarrito() {
    while (lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
    
    // Reiniciar el total del carrito a cero
    const totalCarrito = sumarTotalCarrito();
    document.getElementById('total-carrito').textContent = `$${totalCarrito.toFixed(2)}`;
    
    return false;
}

function sumarTotalCarrito() {
    let totalCarrito = 0;

    // Obtener todas las filas de la tabla del carrito
    const filas = document.querySelectorAll('#lista-carrito tbody tr');

    // Iterar sobre cada fila y sumar los precios
    filas.forEach((fila) => {
        // Obtener el precio de la fila y convertirlo a número
        const precioTexto = fila.querySelector('td:nth-child(3)').textContent;
        const precio = parseFloat(precioTexto.replace('$', '').trim());
        // Sumar el precio al total del carrito
        totalCarrito += precio;
    });

    return totalCarrito;
}

