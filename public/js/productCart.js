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
        let carritoTotal = document.getElementById('div-carrito-totales-cantidad');
        console.log('Carrito JSON =');
        console.log(carritoJson);
        let rowNum;
        let totalCant=0;
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
            totalCant = totalCant + (parseFloat(carritoJson[i-1].cantidad) * parseFloat(carritoJson[i-1].precio));
        }
        carritoTotal.innerText = totalCant;
    } else {
        console.log('Carrito no esta definido');
        rowNum = 'carrito-product-row-1';
        let carritoRow = document.getElementById(rowNum);
        carritoRow.style.display = 'none';        
    }



})

function funEliminarArticulo(numArt){
    console.log('Entre a eliminar articulo, el articulo a eliminar es el = ' + numArt);
    
    let articuloRow = document.getElementById('carrito-product-row-' + numArt);
    let prodNombre = document.getElementById('producto-nombre-' + numArt);
    let prodDescripcion = document.getElementById('producto-descripcion-' + numArt);
    let prodPrecio = document.getElementById('producto-precio-' + numArt);
    let prodCantidad = document.getElementById('producto-cantidad-' + numArt);
    let prodTotal = document.getElementById('producto-total-' + numArt);

    prodNombre.innerText = "---";
    prodDescripcion.innerText = "---";
    prodPrecio.innerText = "---";
    prodCantidad.innerText = "---";
    prodTotal.innerText = "0";

    let totalID;
    let carritoTotal;
    let varCantidad =0;
    let varTotal = 0;
    for( i = 1 ; i <= 20 ; i++ ){
        totalID = 'producto-total-' + (i);
        console.log('id de articulo analizado = ' + totalID);
        carritoTotal = document.getElementById(totalID);
        varCantidad = parseFloat(carritoTotal.innerText); 
        console.log('Cantidad a sumar = ' + varCantidad);  
        articuloRow = document.getElementById('carrito-product-row-' + i);
        if(articuloRow.style.display != 'none') {
            varTotal = varTotal + varCantidad;  
        }
        console.log('Cantidad total sumada = ' + varTotal);   
    }
    
    let totalText = document.getElementById('div-carrito-totales-cantidad');
    totalText.innerText = varTotal;

    let carrito=[];

    let nuevoArticulo = {};

    for( i = 1 ; i <= 20 ; i++ ){
        totalID = 'producto-total-' + (i);
        //console.log('id de articulo analizado = ' + totalID);
        carritoTotal = document.getElementById(totalID);
        varCantidad = parseFloat(carritoTotal.innerText); 
        //console.log('Cantidad a sumar = ' + varCantidad);  
        articuloRow = document.getElementById('carrito-product-row-' + i);
        prodNombre = document.getElementById('producto-nombre-' + i);
        prodDescripcion = document.getElementById('producto-descripcion-' + i);
        prodPrecio = document.getElementById('producto-precio-' + i);
        prodCantidad = document.getElementById('producto-cantidad-' + i);
        prodTotal = document.getElementById('producto-total-' + i);        
        
        if(varCantidad == 0) {
            articuloRow.style.display = 'none';  
        } else {
            nuevoArticulo = {
                id: "10",
                nombre: prodNombre.innerText,
                descripcion: prodDescripcion.innerText,
                precio: prodPrecio.innerText,
                cantidad: prodCantidad.innerText
            };
            carrito.push(JSON.stringify(nuevoArticulo));

        }
  
    }
    console.log('El nuevo JSON es = :');
    console.log(carrito); 

    let carrito2 = JSON.stringify(carrito);
    //carrito2 = carrito2.replace(/['"]+/g, '');
    localStorage.setItem('carritoJson',carrito);

}