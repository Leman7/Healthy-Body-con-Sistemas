let btnCrearCuenta = document.querySelector('#bCrearCuenta')

let nombreApellido = document.querySelector('#nombreyapellido')
let usrEmail = document.querySelector('#emailUsuario')
let usuario = document.querySelector('#nombreUsuario')
let contraseña = document.querySelector('#contraseñaUsuario')

// Conseguir el array del local storage
const datosDelUsuario = JSON.parse(localStorage.getItem('datosUsr')) || []

let flag = true

btnCrearCuenta.addEventListener('click', () => {

    const datosUsuarios = {
        nombreApellido: nombreApellido.value,
        email: usrEmail.value,
        usuario: usuario.value,
        contraseña: contraseña.value
    }

    if((datosUsuarios.nombreApellido != "") && (datosUsuarios.usuario != "") && (datosUsuarios.usuario != "") && (datosUsuarios.contraseña != "")) {

        if (datosDelUsuario.length == 0) {
            
            if (datosUsuarios.contraseña.length < 8) {

                validaCuenta('Contraseña demasiado corta, debe tener 8 o más caracteres.')

            }

            else {

                datosDelUsuario.push(datosUsuarios)
                localStorage.setItem('datosUsr', JSON.stringify(datosDelUsuario))

                setTimeout(() => {
                    window.location.assign('account.html')
                }, 2500);

                cuentaCreada('Cuenta creada con exito!')

            }

        } else{

            datosDelUsuario.forEach(obj => {
                if (obj.usuario == datosUsuarios.usuario) {
                    validaCuenta('Ese usuario ya existe, por favor elije otro')
                    flag = false
                }
            })

            if (flag == true) {

                if (datosUsuarios.contraseña.length < 8) {

                validaCuenta('Contraseña demasiado corta, debe tener 8 o más caracteres.')

                } else {

                    datosDelUsuario.push(datosUsuarios)
                    localStorage.setItem('datosUsr', JSON.stringify(datosDelUsuario))

                    setTimeout(() => {
                        window.location.assign('account.html')
                    }, 2500);

                    cuentaCreada('Cuenta creada con exito!')

                }
    
            }

            flag = true

        }

    } else {
        validaCuenta('Falta ingresar datos.')
    }

})

const cuentaCreada = (mensaje) => {
    Swal.fire({
        title: mensaje,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
        timerProgressBar: true,
        toast: true,
        background: 'black',
        customClass: {
            popup: 'alert alertcc'
        },

      })
}

const validaCuenta = (mensaje) => {
    Swal.fire({
        title: mensaje,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
        position: 'top',
        timerProgressBar: true,
        toast: true,
        background: 'black',
        customClass: {
            popup: 'alert alertcc'
        },

      })
}

const preloader = () => {
    return `<div class="preloader-wrapper active">
    <div class="spinner-layer spinner-red-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>`
}