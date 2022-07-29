let usuario = document.querySelector('#nickName')
let pass = document.querySelector('#password')
let ingresar = document.querySelector('#ingresar')

let array = JSON.parse(localStorage.getItem('datosUsr'))
let flag = false

for (let i = 0; i < array.length; i++) {

    ingresar.addEventListener('click', () => {
        
        if (array[i].usuario == usuario.value) {

            if (array[i].contraseña == pass.value) {
                flag = true

                localStorage.setItem('usuario', JSON.stringify(array[i]))

                setTimeout(() => {
                    window.location.assign('enCuenta.html')
                }, 2500);

                cuentaCreada('Ha ingresado con exito!')
            }
        }

        if (flag == false) {
            validaCuenta('Usuario y/o contraseña incorrectos.')
        }
    
    })
 
}

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

 


