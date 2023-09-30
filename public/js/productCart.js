document.addEventListener('DOMContentLoaded',function(){

    let botonArticuloNuevo = document.querySelector('but-agregar-a-carrito');

    botonArticuloNuevo.addEventListener('click',function(){
        if(localStorage.getItem('carritoJson')){
            let carrito = localStorage.getItem('carritoJson');
            carrito = JSON.parse(carrito);
            carrito.push({document.querySelector('')});
            let divCarrito = document.querySelector('#carrito');
            
            
        } else {

        }       
    })

    
    if(localStorage.getItem('carritoActivo')=='si'){

    } else {
        let carrito = localStorage.getItem('carritoJson');
        carrito.nuevoArticulo = document.querySelector('')
    }


})