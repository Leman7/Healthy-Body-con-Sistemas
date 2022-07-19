let lista = document.querySelector('#listaDatosUser')
let planes = document.querySelector('#planes')
let btnCerrarSesion = document.querySelector('#cerrarSesion')

const planesGym = [{dias: 2, precio: '1500'},
                   {dias: 3, precio: '2000'},
                   {dias: 5, precio: '2500'}]


let arrayDatosUsr = JSON.parse(localStorage.getItem('datosUsr'))

function cargarDatos() {

    let map = arrayDatosUsr.map((x) => {

        const {nombreApellido, email, usuario, contraseña} = x

        return `<li class="datos"> Nombre: ${nombreApellido}</li>
                <li class="datos"> Email: ${email}</li>
                <li class="datos"> Usuario: ${usuario}</li>
                <li class="datos"> Contraseña: ${contraseña}</li>`
    })

    lista.innerHTML = map.join('')

}

function cargarPlanes() {

    let map = planesGym.map((x) => {

        const {dias, precio} = x

        return `<div>
                    <option class="diasG">Dias: ${dias} días a la semana, precio: $${precio}</option>
                </div>`

    })



    planes.innerHTML = map.join('')
}

btnCerrarSesion.addEventListener('click', () => {

    validaCierreSesion('Esta seguro que desea cerrar sesión?')

})

cargarPlanes()
cargarDatos()

const validaCierreSesion = (mensaje) => {
    Swal.fire({
        title: mensaje,
        icon: 'question',
        showConfirmButton: true,
        confirmButtonText: "Cerrar Sesión",
        showCancelButton: true,
        cancelButtonText: "No, mantener mi sesión",
        position: 'top',
        toast: true,
        background: 'black',
        customClass: {
            popup: 'alert alertcc'
        },

      })

      .then(resultado => {

            if (resultado.value) {

                cerrandoSesion('Hasta luego!')

                setTimeout(() => {
                    window.location.assign('account.html')
                }, 2500);
            }
      })
}

const cerrandoSesion = (mensaje) => {
    Swal.fire({
        title: mensaje,
        showConfirmButton: false,
        position: 'top',
        toast: true,
        background: 'black',
        timerProgressBar: true,
        timer: 2000,
        customClass: {
            popup: 'alert alertcc'
        },

      })
}