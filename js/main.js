function aleatorio(min, max) {
   var num = Math.floor(Math.random()*(max-min+1))+min;
   return num;
}

function in_array(needle, haystack) {
   var length = haystack.length;
   for(var i = 0; i < length; i++) {
       if(haystack[i] == needle) return true;
   }
   return false;
}

$(document).ready(function(){

   $('#calling_bingo_numbers').on('click', function(e) {   
      console.log("*********** Click a calling_bingo_numbers ***********");    

      //OBTENEMOS NUMEROS ALEATORIOS YA GENERADOS
      var numeros_aleatorios = JSON.parse(localStorage.getItem('numeros_aleatorios'));      
      console.log('numeros_aleatorios', numeros_aleatorios);
    
      //ES EL PRIMERO NUMERO ALEATORIO GENERADO
      if (numeros_aleatorios === null || numeros_aleatorios === undefined) {
         console.log("No existe en localStorage");
         var num_aleatorio = aleatorio(1, 75);
         
         json = [num_aleatorio];
         console.log(json)

         localStorage.setItem('numeros_aleatorios', JSON.stringify(json));
         localStorage.setItem("numero_aleatorio_actual", num_aleatorio);      
         numeros_aleatorios = json;       
      } else { //NO ES EL PRIMER NUMERO ALEATORIO GENERADO
         console.log("Existe en localStorage");
         var x = 0;
      
         while (x<1) {
            var num_aleatorio = aleatorio(1, 75);
            if (!in_array(num_aleatorio, numeros_aleatorios)) {               
               
               numeros_aleatorios.push(num_aleatorio);
               console.log('numeros_aleatorios', numeros_aleatorios);

               localStorage.setItem("numeros_aleatorios", JSON.stringify(numeros_aleatorios));
               localStorage.setItem("numero_aleatorio_actual", num_aleatorio);

               x++;
            }
         }  
      }
      
      //LIMPIAMOS VISTA
      $("#view-numbers").html('');

      //RENDERIZAMOS NUMEROS ALEATORIOS EN VISTA      
      var html = "";
      
      numeros_aleatorios.forEach(function callback(currentValue, index, array) {
         // console.log('currentValue', currentValue)                  
         html += `${currentValue}, `;
      });      

      $("#view-numbers").html(html);      

      //RENDERIZAMOS NUMERO ALEATROIO ACTUAL
      var numero_aleatorio_actual = JSON.parse(localStorage.getItem('numero_aleatorio_actual'));
      $("#view-number").html(numero_aleatorio_actual);      
   });
   
   $('#delete_bingo_numbers').on('click', function(e) {
      localStorage.clear();
      $("#view-numbers").html('');
      alert("Se eliminaron numeros");
   });
   
   $('#generate_bingo_cards').on('click', function(e) {
   });
   
   $('#delete_bingo_cards').on('click', function(e) {
   });

});