let carShop = localStorage.getItem('carrito')
const productosCarrito = document.querySelector('#productos')
let contenedorTotalPagar = document.querySelector('#contenedorTotalPagar')
let btnComprarYa = document.querySelector('#comprarYa')

carShop ? addItem() : notItem() 

function addItem() {
    const stringToParse = JSON.parse(carShop)
    let map = stringToParse.map((x) => {
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
                    <button class='btnEliminar'>Eliminar</button>
                </div>
            </div> 
            `
        )
    })
    productosCarrito.innerHTML = map.join('')

    let precio = 0
    let carritoShop = JSON.parse(localStorage.getItem('carrito'))

    for (i = 0; i < carritoShop.length; i++) {
        precio = precio + (carritoShop[i].precio * carritoShop[i].cantidad)
    }

    let precioTotal = `<p>Total a pagar: $${precio}`
    contenedorTotalPagar.innerHTML = precioTotal

    localStorage.setItem('totalPagar', precio)

    let eliminarProducto = document.getElementsByClassName('btnEliminar')

    for (let i = 0; i < eliminarProducto.length; i++) {
        eliminarProducto[i].addEventListener('click', () => {

            if (stringToParse[i].cantidad > 1) {
                stringToParse[i].cantidad -= 1
                location.reload()
                eliminarProducto[i].parentNode.getElementsByClassName('cantidad')[0].innerHTML = stringToParse[i].cantidad
            }else {
                let indice = stringToParse.findIndex( elemento => {
                    return elemento.tipo == eliminarProducto[i].parentNode.getElementsByClassName('tipo')[0].innerText
                })
                eliminarProducto[i].parentNode.parentNode.remove()
                stringToParse.splice(indice, 1)
            }
            
            localStorage.setItem('carrito', JSON.stringify(stringToParse))

            for (i = 0; i < carritoShop.length; i++) {
                precio = precio - carritoShop[i].precio
            }
        
        })
    }

}

function notItem() {
    let carritoVacio = `<li class = 'productoCarrito'> No hay productos agregados </li>`
    productosCarrito.innerHTML = carritoVacio
}

function eliminarCarrito () {
    let btnEliminar = document.querySelector('#borrarCarrito')
    btnEliminar.addEventListener('click', () => {
        carShop = []
        localStorage.setItem('carrito', carShop)
        location.reload()
    })
}

eliminarCarrito()

btnComprarYa.addEventListener('click', () => {
    if (carShop == "") {
        compraVacia('Usted no ha seleccionado ningun articulo!')
    }
    else {
        window.location.assign('realizarPago.html')
    }
})

const compraVacia = (mensaje) => {
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