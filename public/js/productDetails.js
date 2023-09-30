document.addEventListener('DOMContentLoaded',function(event){

    let botonArticuloNuevo = document.querySelector('#but-add-art');
    let botonSumar = document.querySelector('#boton-sumar');
    let botonRestar = document.querySelector('#boton-restar');

    botonArticuloNuevo.addEventListener('click',function(event){
        
        let productoNombre = document.querySelector('#producto-nombre');
        let productoDescripcion = document.querySelector('#producto-descripcion');
        let productoID = document.querySelector('#producto-id').value;  
        let productoPrecio = document.querySelector('#producto-precio'); 
        let productoCantidad = document.querySelector('#producto-cantidad').value;

        if(localStorage.getItem('carritoJson')){

            console.log("Estoy entrando a carrito existente");
            
            let carrito=[];
            carrito.push(localStorage.getItem('carritoJson'));
            console.log("Carrito antes de agregar nuevo producto = " + carrito);
            //carrito = JSON.parse(carrito);

            let nuevoArticulo = {
                id: productoID,
                nombre: productoNombre.innerText,
                descripcion: productoDescripcion.innerText,
                precio: productoPrecio.innerText,
                cantidad: productoCantidad
            };

            let nuevoArticulo2 = JSON.stringify(nuevoArticulo);
            //nuevoArticulo2 = nuevoArticulo2.replace(/['"]+/g, '');

            carrito.push(nuevoArticulo2);
            
            console.log("Carrito despues de agregar nuevo producto = " + carrito);
            //localStorage.setItem('carritoJson',JSON.stringify(carrito));
            localStorage.setItem('carritoJson',carrito);
            console.log("carritoJson = " + localStorage.getItem('carritoJson'));
            let temp = "[" + localStorage.getItem('carritoJson') + "]";
            let temp2 = JSON.parse(temp);
            console.log(temp2);
          
        } else {
            console.log('Estoy entrando a carrito vacio');


            let carrito = {
                id: productoID,
                nombre: productoNombre.innerText,
                descripcion: productoDescripcion.innerText,
                precio: productoPrecio.innerText,
                cantidad: productoCantidad
            };

            let carrito2 = JSON.stringify(carrito);
            //carrito2 = carrito2.replace(/['"]+/g, '');

            localStorage.setItem('carritoJson',carrito2);
            console.log('localStorage carritoJson = ' + localStorage.getItem('carritoJson'))
        }       
    })

    botonSumar.addEventListener('click',function(event){
        let productoCantidad = document.querySelector('#producto-cantidad');
        let varCantidad = parseInt(productoCantidad.value) + 1;
        productoCantidad.value = varCantidad;
    })

    botonRestar.addEventListener('click',function(event){
        let productoCantidad = document.querySelector('#producto-cantidad');
        let varCantidad = parseInt(productoCantidad.value);
        if(varCantidad > 1){
            varCantidad = varCantidad - 1;
            productoCantidad.value = varCantidad;
        }
    })

})