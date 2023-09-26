document.addEventListener("DOMContentLoaded",function(){
    if(document.getElementById("variables-escondidas-pais").value!="PRIMERA-CARGA"){
        //alert('Entre a algo diferente a primera carga');
        document.getElementById("country").selectedIndex = document.getElementById("variables-escondidas-pais-index").value
    }  else {
        //alert('Entre a primera carga');
    }  
})

function getPais(){
    var index = document.getElementById("country").selectedIndex;
    var list = document.getElementById("country").options;
    //alert("Index: " + list[index].index + " is " + list[index].text);
    document.getElementById("variables-escondidas-pais").value = list[index].text;
    document.getElementById("variables-escondidas-pais-index").value = list[index].index;
}