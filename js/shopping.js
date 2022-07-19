let carShop = localStorage.getItem('carrito')
const productosCarrito = document.querySelector('#productos')

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