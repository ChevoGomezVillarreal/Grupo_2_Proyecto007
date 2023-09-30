document.addEventListener('DOMContentLoaded',function(){

    let carrito = localStorage.getItem('carritoJson');

    if(carrito){
        let carrito2 = "[" + localStorage.getItem('carritoJson') + "]";
        let carritoJson = JSON.parse(carrito2);
        console.log('Carrito JSON =');
        console.log(carritoJson);
    }

})