let carritoPagar = localStorage.getItem('carrito')
let cajaPagar = document.querySelector('#cajaPagar')
let contenedorTotalAPagar = document.querySelector('#totalAPagarCarrito')
let btnComprarAhora = document.querySelector('#buttonComprarAhora')
let btnVolverCarrito = document.querySelector('#buttonVolverCarrito')

function mostrarProductosAPagar() {
    let productosPagar = JSON.parse(carritoPagar)
    let map = productosPagar.map((x) => {
        const{tipo, cantidad, precio, img} = x
        return(
            `<div class="contenedorProductosAgregados">
                <div class="imagenProductosAgregados">
                    <img class="imgCarrito" src="../assets/imgCatalogo/${img}.png" alt="Productos del Catalogo">
                </div>

                <div class="detalleProductosAgregados">
                    <li class='productoCarrito tipo'>${tipo}</li>
                    <li class='productoCarrito cantidad'>${cantidad} kg</li>
                    <li class='productoCarrito'>$${precio}</li>
                </div>
            </div> 
            `
        )
    })

    cajaPagar.innerHTML = map.join('')
    
    let precio = localStorage.getItem('totalPagar')

    let totalAPagar = `<p>Total a pagar: $${precio}</p>`
    contenedorTotalAPagar.innerHTML = totalAPagar

    
}

mostrarProductosAPagar()

btnComprarAhora.addEventListener('click', () => {
    compraRealizada('Su compra se ha realizado con exito, gracias por elegirnos!') 
}) 

btnVolverCarrito.addEventListener('click', () => {

    compraCancelada('Su compra ha sido cancelada con exito. Redireccionando.')

    setTimeout(() => {
        window.location.assign('../index.html')
    }, 2500);
})

const compraRealizada = (mensaje) => {
    Swal.fire({
        title: mensaje,
        icon: 'success',
        showConfirmButton: false,
        background: 'black',
        timerProgressBar: true,
        timer: 2000,
        customClass: {
            popup: 'alert alertcc'
        },

      })
}

const compraCancelada = (mensaje) => {
    Swal.fire({
        title: mensaje,
        icon: 'error',
        showConfirmButton: false,
        background: 'black',
        timerProgressBar: true,
        timer: 2000,
        customClass: {
            popup: 'alert alertcc'
        },

      })
}