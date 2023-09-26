document.addEventListener("DOMContentLoaded",function(){
    if(document.getElementById("variables-escondidas-pais").value!="PRIMERA-CARGA"){
        //alert('Entre a algo diferente a primera carga');
        document.getElementById("country").selectedIndex = document.getElementById("variables-escondidas-pais-index").value
    }  else {
        //alert('Entre a primera carga');
    }  

    let list = document.getElementById("country").options;
    for( i=0 ; i < list.length; i++ ){
        if(list[i].text == document.getElementById("variables-escondidas-pais").value){
            list.selectedIndex = i;
            return;
        }
    }
})

function getPais(){
    let index = document.getElementById("country").selectedIndex;
    let list = document.getElementById("country").options;
    //alert("Index: " + list[index].index + " is " + list[index].text);
    document.getElementById("variables-escondidas-pais").value = list[index].text;
    document.getElementById("variables-escondidas-pais-index").value = list[index].index;
}