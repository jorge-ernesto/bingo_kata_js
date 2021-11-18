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

function getBingoNumbers(numeros_aleatorios){ 
   if (numeros_aleatorios !== null) {
      //LIMPIAMOS VISTA
      $("#view-numbers").html('');

      //RENDERIZAMOS NUMEROS ALEATORIOS EN VISTA      
      var html = "";
      numeros_aleatorios.forEach(function callback(currentValue, index, array) {
         // console.log('currentValue', currentValue)                  
         html += `${currentValue}, `;
      });      
      $("#view-numbers").html(html);      

      //RENDERIZAMOS NUMERO ALEATORIO ACTUAL
      var numero_aleatorio_actual = JSON.parse(localStorage.getItem('numero_aleatorio_actual'));
      $("#view-number").html(numero_aleatorio_actual);    
   }
}

$(document).ready(function(){

   //FUNCION QUE RENDERIZA LA INFORMACION AL CARGAR LA PAGINA
   var numeros_aleatorios = JSON.parse(localStorage.getItem('numeros_aleatorios'));      
   getBingoNumbers(numeros_aleatorios);

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
      
      //RENDERIZAMOS INFORMACION ACTUALIZADA
      getBingoNumbers(numeros_aleatorios);  
   });
   
   $('#delete_bingo_numbers').on('click', function(e) {
      localStorage.clear();
      $("#view-numbers").html('');
      $("#view-number").html('0');
      alert("Se eliminaron numeros");
   });
   
   $('#generate_bingo_cards').on('click', function(e) {
      console.log("generate_bingo_cards");
      var valores = [];
      var x = 0;
      
      //OBTENEMOS 25 NUMEROS ALEATORIOS DEL 1 AL 75 PARA EL BINGO CARD
      while (x<25) {
         var num_aleatorio = aleatorio(1,75);
         if (!in_array(num_aleatorio,valores)) {
           valores.push(num_aleatorio);
           x++;
         }
      }   
      localStorage.setItem("bingo_cards", JSON.stringify(valores));

      //RENDERIZAMOS BINGO CARD
      var linea1 = "";
      var linea2 = "";
      var linea3 = "";
      var linea4 = "";
      var linea5 = "";
      valores.forEach(function callback(currentValue, index, array) {
         if(index >= 0 && index <= 4){
            linea1 += `<td>${currentValue}</td>`
         }      
         if(index >= 5 && index <= 9){
            linea2 += `<td>${currentValue}</td>`
         }      
         if(index >= 10 && index <= 14){
            linea3 += `<td>${currentValue}</td>`
         }         
         if(index >= 15 && index <= 19){
            linea4 += `<td>${currentValue}</td>`
         }      
         if(index >= 20 && index <= 24){
            linea5 += `<td>${currentValue}</td>`
         }      
      });      
      $("#linea1").html(linea1);  
      $("#linea2").html(linea2);  
      $("#linea3").html(linea3);  
      $("#linea4").html(linea4);  
      $("#linea5").html(linea5);  
   });
   
   $('#delete_bingo_cards').on('click', function(e) {
      $("#linea1").html('');  
      $("#linea2").html('');  
      $("#linea3").html('');  
      $("#linea4").html('');  
      $("#linea5").html(''); 
      alert("Se elimino bingo card");
   });

});