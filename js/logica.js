import { productos, items } from "./basedatos.js"

function cargarProductos() {

    let map = productos.map((x) => {

        const {tipo, cantidad, precio, img} = x;

        return (      
            `<div class='contieneProductos'>
                <img class="imagenesProductos" src="../assets/imgCatalogo/${img}.png" alt="Productos del Catalogo">
                <h2 id='tipo' class='producto'>${tipo}</h2>
                <span class='producto'>cantidad: ${cantidad} kg</span>
                <span class='producto'>precio: $${precio}</span>
                <button class='btnAgregar'>Agregar</button>
            </div>`
        )
    })

    items.innerHTML = map.join('')

    let btn = document.querySelectorAll('.btnAgregar')
    let tipo = document.querySelectorAll('#tipo')

    for (let j = 0 ; j < btn.length ; j++) {
        btn[j].addEventListener('click', () => {
            agregarProductosLS(tipo[j].innerText)
            alertar('Producto agregado!')
        })
    }

}

cargarProductos()

let proStorage = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];

function agregarProductosLS(prod) {

    let findProStorage = proStorage.findIndex(index => index.tipo == prod)
    
    let find = productos.findIndex(index => index.tipo == prod)
        
    if(findProStorage == -1){
    
        let obj = productos[find]
        
        proStorage.push(obj)
    
    }else {
        
        proStorage[findProStorage].cantidad += 1;
    
    }
    
    localStorage.setItem("carrito", JSON.stringify(proStorage))
    
    }

const alertar = (mensaje) => {
    Swal.fire({
        title: mensaje,
        icon: 'success',
        showConfirmButton: false,
        position: 'bottom-end',
        timer: 2500,
        animation: false,
        timerProgressBar: true,
        toast: true,
        background: 'black',
        customClass: {
            container: 'animate__animated animate__backInLeft',
            popup: 'alert alertcc'
        },

      })
}