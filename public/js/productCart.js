document.addEventListener('DOMContentLoaded',function(event){

    console.log('Entrando a productCart');
    let carrito = localStorage.getItem('carritoJson');
    console.log('Carrito JSON = ' + carrito);

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
            nombreIDInput = 'input-' + nombreID;
            let carritoNombre = document.getElementById(nombreID);            
            carritoNombre.innerText = carritoJson[i-1].nombre;
            document.getElementById(nombreIDInput).value = carritoJson[i-1].nombre;

            descID = 'producto-descripcion-' + i;
            descIDInput = 'input-' + descID;
            let carritoDesc = document.getElementById(descID);            
            carritoDesc.innerText = carritoJson[i-1].descripcion;   
            document.getElementById(descIDInput).value = carritoDesc.innerText;
            
            precioID = 'producto-precio-' + i;
            precioIDInput = 'input-' + precioID;
            let carritoPrecio = document.getElementById(precioID);            
            carritoPrecio.innerText = carritoJson[i-1].precio;   
            document.getElementById(precioIDInput).value = carritoPrecio.innerText;            

            cantidadID = 'producto-cantidad-' + i;
            cantidadIDInput = 'input-' + cantidadID;
            let carritoCantidad = document.getElementById(cantidadID);            
            carritoCantidad.innerText = carritoJson[i-1].cantidad; 
            document.getElementById(cantidadIDInput).value = carritoCantidad.innerText; 

            totalID = 'producto-total-' + i;
            totalIDInput = 'input-' + totalID;
            let carritoTotal = document.getElementById(totalID);            
            carritoTotal.innerText = parseFloat(carritoJson[i-1].cantidad) * parseFloat(carritoJson[i-1].precio);             
            totalCant = totalCant + (parseFloat(carritoJson[i-1].cantidad) * parseFloat(carritoJson[i-1].precio));
            document.getElementById(totalIDInput).value = carritoTotal.innerText; 
            
            prodId = 'producto-id-' + i;
            prodIDInput = 'input-' + prodId;
            let productoID = document.getElementById(prodId);            
            productoID.innerText = carritoJson[i-1].id;    
            document.getElementById(prodIDInput).value = productoID.innerText;        
        }
        carritoTotal.innerText = totalCant;
        document.getElementById('input-div-carrito-totales-cantidad').value = carritoTotal.innerText;
        document.getElementById('articulos-totales').value = carritoJson.length;

    } else {
        console.log('Carrito no esta definido');
        rowNum = 'carrito-product-row-1';
        let carritoRow = document.getElementById(rowNum);
        carritoRow.style.display = 'none';  
        document.getElementById('articulos-totales').value = '0';      
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
    //Sumo la cantidad monetaria de cada articulo en la orden, la columna TOTAL
    //Checo cada linea de articulo en el carrito
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

    //Reajusto el array que contiene los productos de la orden
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
        prodId = document.getElementById('producto-id-' + i); 
        
        if(varCantidad == 0) {
            //Las lineas de productos en la orden que su total es $0
            //Las escondo
            articuloRow.style.display = 'none';  
        } else {
            //Las que si contienen algo las asigno a un articulo nuevo
            
            nuevoArticulo = {
                id: prodId.innerText,
                nombre: prodNombre.innerText,
                descripcion: prodDescripcion.innerText,
                precio: prodPrecio.innerText,
                cantidad: prodCantidad.innerText
            };
            //Despues agrego el nuevo articulo al array de productos
            carrito.push(JSON.stringify(nuevoArticulo));

        }
  
    }
    console.log('El nuevo JSON es = :');
    console.log(carrito); 

    let carrito2 = JSON.stringify(carrito);
    //carrito2 = carrito2.replace(/['"]+/g, '');

    //Finalmente le asigno el nuevo array de productos a localStorage.carritoJson
    localStorage.setItem('carritoJson',carrito);

}