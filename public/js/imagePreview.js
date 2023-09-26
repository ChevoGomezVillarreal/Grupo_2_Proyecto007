document.addEventListener('DOMContentLoaded', function(){
        let image = document.querySelector('#image');
        let imageDisplay = document.querySelector('#image-display');

        image.addEventListener('change', function (event){
            console.log(event);
            
            if(event.target.files.length >=1){
                let img = event.target.files[0];
                imageDisplay.src = URL.createObjectURL(img);
            }

        })



})