document.addEventListener('DOMContentLoaded',function(event){
    console.log('Entrando a productCart');
    let carrito = localStorage.getItem('carritoJson');
    console.log('Carrito JSON = ' + carrito);

    let htmlCarritoProductRows = "<section class='seccionCartL1' id='carrito-product-row'>"

    htmlCarritoProductRows = htmlCarritoProductRows & "<section class='seccionDescripcionDelProducto cartTableCell col1'>"

    htmlCarritoProductRows = htmlCarritoProductRows & "<header class='headerDescripcionDelProducto cartTableCellDescL1'>"
    htmlCarritoProductRows = htmlCarritoProductRows & "<p id='producto-nombre'>"
    htmlCarritoProductRows = htmlCarritoProductRows & "PRODUCTO MUESTRA"
    htmlCarritoProductRows = htmlCarritoProductRows & "</p>"
    htmlCarritoProductRows = htmlCarritoProductRows & "</header>"

    htmlCarritoProductRows = htmlCarritoProductRows & "<article class='articuloDescripcionDelProducto'>"
    htmlCarritoProductRows = htmlCarritoProductRows & "<p id='producto-descripcion'>"
    htmlCarritoProductRows = htmlCarritoProductRows & "DESCRIPCION MUESTRA"
    htmlCarritoProductRows = htmlCarritoProductRows & "</p>"
    htmlCarritoProductRows = htmlCarritoProductRows & "</article>"

    htmlCarritoProductRows = htmlCarritoProductRows & "</section>"

    htmlCarritoProductRows = htmlCarritoProductRows & "<article class='articlePrecioProducto cartTableCell col2'>"
    htmlCarritoProductRows = htmlCarritoProductRows & "<p style='display:inline'>$</p>"
    htmlCarritoProductRows = htmlCarritoProductRows & "<p id='producto-precio' style='display:inline'>123</p>"
    htmlCarritoProductRows = htmlCarritoProductRows & "</article>"

    htmlCarritoProductRows = htmlCarritoProductRows & "<article class='articlePrecioProducto cartTableCell col3'>"
    htmlCarritoProductRows = htmlCarritoProductRows & "<p id='producto-cantidad' style='display:inline'>10</p>"
    htmlCarritoProductRows = htmlCarritoProductRows & "</article>"

    htmlCarritoProductRows = htmlCarritoProductRows & "<article class='articlePrecioProducto cartTableCell col4'>"
    htmlCarritoProductRows = htmlCarritoProductRows & "<p style='display:inline'>$</p>"
    htmlCarritoProductRows = htmlCarritoProductRows & "<p id='producto-total' style='display:inline'>10</p>"
    htmlCarritoProductRows = htmlCarritoProductRows & "</article>"

    htmlCarritoProductRows = htmlCarritoProductRows & "</section>"

    if(carrito!=undefined){
        let carrito2 = '[' + localStorage.getItem('carritoJson') + ']';
        let carritoJson = JSON.parse(carrito2);
        console.log('Carrito JSON =');
        console.log(carritoJson);
        let rowNum;
        let descripcion="";
        for( i = 1 ; i <= carritoJson.length ; i++ ){
            rowNum = 'carrito-product-row-' + i;
            
            let carritoRow = document.getElementById(rowNum);
            carritoRow.style.display = 'flex';

            nombreID = 'producto-nombre-' + i;
            let carritoNombre = document.getElementById(nombreID);            
            carritoNombre.innerText = carritoJson[i-1].nombre;

            descID = 'producto-descripcion-' + i;
            let carritoDesc = document.getElementById(descID);            
            carritoDesc.innerText = carritoJson[i-1].descripcion;   
            
            precioID = 'producto-precio-' + i;
            let carritoPrecio = document.getElementById(precioID);            
            carritoPrecio.innerText = carritoJson[i-1].precio;               

            cantidadID = 'producto-cantidad-' + i;
            let carritoCantidad = document.getElementById(cantidadID);            
            carritoCantidad.innerText = carritoJson[i-1].cantidad; 

            totalID = 'producto-total-' + i;
            let carritoTotal = document.getElementById(totalID);            
            carritoTotal.innerText = parseFloat(carritoJson[i-1].cantidad) * parseFloat(carritoJson[i-1].precio);             
        }
    } else {
        console.log('Carrito no esta definido');
        rowNum = 'carrito-product-row-1';
        let carritoRow = document.getElementById(rowNum);
        carritoRow.style.display = 'none';        
    }

})