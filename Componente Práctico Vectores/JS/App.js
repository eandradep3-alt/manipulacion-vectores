const selectDimension = document.getElementById("select-dimension-arreglo")
const btnCargarVector = document.getElementById("btn-cargar-vector")
const btnVaciarVector = document.getElementById("btn-vaciar-vector")
const tableTbody = document.querySelector("#id-table-vector-numerico > tbody")
const btnPresentarVector = document.getElementById("btn-presentar-vector")
const btnOrdenamientoSeleccion = document.getElementById("btn-ordenamiento-select")
const btnOrdenamientoBurbuja = document.getElementById("btn-ordenamiento-burbuja")

// Nuevos botones
const btnValorMinimo = document.getElementById("btn-valor-minimo")
const btnValorMaximo = document.getElementById("btn-valor-maximo")
const btnSumaTotal = document.getElementById("btn-suma-total")
const btnProductoTotal = document.getElementById("btn-producto-total")
const btnMedia = document.getElementById("btn-media")
const btnMediana = document.getElementById("btn-mediana")
const btnModa = document.getElementById("btn-moda")
const tipoDeOrdenSeleccion = document.getElementById("tipo-orden")



const resultado = document.getElementById("resultado")

const NUM_MAXIMO_RANDOM = 1000
let vector = []
let vectorOrdenado = false

btnCargarVector.addEventListener("click", function(e){
    const dimension = selectDimension.value 
    vaciarVector()
    cargarVector(dimension)
    console.log(vector)
})

btnPresentarVector.addEventListener("click", function(e){
    presentarVector()
})

btnVaciarVector.addEventListener("click", function(){
    vaciarVector()

})

// Botones nuevos
btnValorMinimo.addEventListener("click", function(){
    encontrarValorMinimo()
})

btnValorMaximo.addEventListener("click", function(){
    encontrarValorMaximo()
})

btnSumaTotal.addEventListener("click", function(){
    let suma = calcularSumaTotal()
    resultado.value = "Suma total: " + suma
})


btnProductoTotal.addEventListener("click", function(){
    calcularProductoTotal()
})

btnMedia.addEventListener("click", function(){
    let media = calcularMedia()
    if(media != undefined){
        resultado.value =
            "Media: " + media.toFixed(2)
    }
})

btnOrdenamientoSeleccion.addEventListener("click", function(){
    ordenarSeleccion()
})

btnOrdenamientoBurbuja.addEventListener("click", function(){
    ordenarBurbuja()
})

btnMediana.addEventListener("click", function(){
    let mediana = calcularMediana()
    if(mediana != undefined){
        resultado.value =
            "Mediana: " + mediana.toFixed(2)
    }
})


btnModa.addEventListener("click", function(){
    resultado.value = calcularModa()

})

function cargarVector(dimension){
    vectorOrdenado = false
    for (let i = 0; i < dimension; i++){
        const numero = Math.ceil(Math.random() * NUM_MAXIMO_RANDOM)
        vector[i] = numero
    }
}


function vaciarVector(){
    vector = [] // Vaciar el arreglo
    resultado.value = ""   // Limpiar el cuadro de resultados

    tableTbody.innerHTML = "" // Limpiar la tabla
}

function presentarVector(){
    let contador = 0
    let str = ""
    while(contador < 2){
        str += `<tr>`
        for (let i = 0; i < vector.length; i++){
            if (contador == 0){
                str += `<td>${i}</td>`
            } else{
                str += `<td bgcolor="#00ff00">${vector[i]}</td>`
            }
        }
        str += `</tr>`
        contador++
    }
    tableTbody.innerHTML = str
}

// Función: Valor mínimo
function encontrarValorMinimo(){
    // Verifica si el vector está vacío
    if(vector.length == 0){
        resultado.value = "Vector vacío"
        return
    }
    // Se toma el primer elemento como mínimo temporal
    let minimo = vector[0]
    let posiciones = []  // Arreglo para guardar las posiciones
    // donde se encuentre el valor mínimo

    // Recorrer todo el vector para buscar
    // el valor más pequeño
    for(let i = 0; i < vector.length; i++){

         // Si el elemento actual es menor
        // que el mínimo encontrado
        if(vector[i] < minimo){
            minimo = vector[i]
        }
    }

     // Recorrer nuevamente el vector para
    // encontrar la posición del valor mínimo
    for(let i = 0; i < vector.length; i++){

          // Si el valor coincide con el mínimo
        // se guarda la posición
        if(vector[i] == minimo){
            posiciones.push(i)
        }
    }
    resultado.value = "Mínimo: " + minimo + " en la posición: " + posiciones.join(", ")
}


// Función: Valor máximo
function encontrarValorMaximo(){
    // Verifica si el vector está vacío
    if(vector.length == 0){
        resultado.value = "Vector vacío"
        return
    }
    // Se toma el primer elemento como máximo temporal
    let maximo = vector[0]
    let posiciones = []

    // Recorrer todo el vector para encontrar
    // el valor más grande
    for(let i = 0; i < vector.length; i++){

        // Si el elemento actual es mayor
        // que el máximo encontrado
        if(vector[i] > maximo){
            maximo = vector[i]
        }
    }
    // Buscar las posiciones donde se encuentra
    // el valor máximo
    for(let i = 0; i < vector.length; i++){
        if(vector[i] == maximo){
            posiciones.push(i)
        }
    }
    resultado.value = "Máximo: " + maximo + " en la posición: " + posiciones.join(", ")
}

// Función: Suma total
function calcularSumaTotal(){
// Verifica si el vector está vacío
    if(vector.length == 0){
        return 0
    }
    let suma = 0// Variable acumuladora para guardar la suma

     // Recorrer todos los elementos del vector
    for(let i = 0; i < vector.length; i++){
        suma += vector[i]// Acumular cada valor en la variable suma
    }
    return suma
}

// Función: Producto total
function calcularProductoTotal(){
     // Verifica si el vector está vacío
    if(vector.length == 0){
        resultado.value = "Vector vacío"
        return
    }
    // Se inicializa en 1 porque es el elemento
    // neutro de la multiplicación
    let producto = 1

     // Recorrer todos los elementos del vector
    for(let i = 0; i < vector.length; i++){
        producto *= vector[i]  // Multiplicar cada elemento por el producto acumulado
    }
    resultado.value = "Producto total: " + producto
}

//Función Calcular Media
function calcularMedia(){

    //Validación para comprobar que primero se haya cargado el vector antes de calcular la media
      if(vector.length == 0){ //"¿El vector tiene 0 elementos?"
        resultado.value = "Vector vacío"
        return //Termina la función aquí mismo
    }
    let suma = calcularSumaTotal()
    let media = suma / vector.length
    
    return media
}


// Función Ordenamiento por Selección
function ordenarSeleccion(){

    // Verifica si el vector tiene elementos
    if(vector.length == 0){
        resultado.value = "Vector vacío"
        return
    }
    let ascendente = tipoDeOrdenSeleccion.value == "asc"
    //Si el usario selecciona el tipo de ordenamiento "ascendente" , tipoDeOrdenSeleccion va a ser igual a ascendente
    //Vamos a comparar segun el id que le hemos dado "asc", que eso nos devolvera un true o false
    //Ejemplo: "acs" == "asc" igual a true , "desc" == "asc" igual a false

    for(let i = 0; i < vector.length - 1; i++){ //recorre todo el vector menos la ultima posicion
     // Recorremos el vector desde la primera posición
    // hasta la penúltima

        // Suponemos que el menor (o mayor)
        // se encuentra en la posición actual i
        let indice = i

        // Buscamos en las posiciones siguientes
        for(let j = i + 1; j < vector.length; j++){

            if(ascendente){

                // Si encontramos un número menor,
                // guardamos su posición
                if(vector[j] < vector[indice]){
                    indice = j
                }

            }else{

                // Si encontramos un número mayor,
                // guardamos su posición
                if(vector[j] > vector[indice]){
                    indice = j
                }

            }
        }

        // Intercambio de posiciones
        // Guardamos temporalmente el valor de i
        let intercambio = vector[i]

        // Colocamos el menor (o mayor) encontrado
        vector[i] = vector[indice]

        // Recuperamos el valor original
        vector[indice] = intercambio
    }

    vectorOrdenado = true
    // Actualizamos la tabla con el vector ordenado
    presentarVector()

    // Mostramos mensaje al usuario
    resultado.value =
    "Vector ordenado por selección (" +
    (ascendente ? "Ascendente" : "Descendente") +
    ")"
}


// Función Ordenamiento Burbuja
function ordenarBurbuja(){

    // Verifica si el vector está vacío
    if(vector.length == 0){
        resultado.value = "Vector vacío"
        return
    }

    // true = Ascendente
    // false = Descendente
    let ascendente = tipoDeOrdenSeleccion.value == "asc"

    // Número de pasadas por el vector
    for(let i = 0; i < vector.length - 1; i++){

        // Recorremos comparando elementos vecinos
        for(let j = 0; j < vector.length - 1 - i; j++){

            if(ascendente){

                // Si el elemento actual es mayor
                // que el siguiente, intercambiamos
                if(vector[j] > vector[j + 1]){

                    let intercambio = vector[j]

                    vector[j] = vector[j + 1]

                    vector[j + 1] = intercambio
                }

            }else{

                // Para descendente hacemos lo contrario
                if(vector[j] < vector[j + 1]){
                    let intercambio = vector[j]
                    vector[j] = vector[j + 1]
                    vector[j + 1] = intercambio
                }
            }
        }
    }

    vectorOrdenado = true
    // Mostrar el vector ya ordenado
    presentarVector()

    resultado.value =
    "Vector ordenado por burbuja (" +
    (ascendente ? "Ascendente" : "Descendente") +
    ")"
}

// Función para calcular la mediana
function calcularMediana(){

    // Verificar si el vector está vacío
    // Si no hay elementos no podemos calcular nada
    if(vector.length == 0){
        resultado.value = "Vector vacío"
        return 0
    }

    // Verificar si el usuario ya ordenó el vector
    // La mediana necesita que los datos estén ordenados
    if(vectorOrdenado == false){
    resultado.value = "Primero ordene el vector"
    return
}

    // Variable donde guardaremos el resultado final
    let mediana

    // Verificar si la cantidad de elementos es impar
    // Ejemplo:
    // 5 % 2 = 1
    // 7 % 2 = 1
    if(vector.length % 2 != 0){

        // Encontrar la posición central
        // Ejemplo:
        // vector.length = 5
        // 5 / 2 = 2.5
        // Math.floor(2.5) = 2
        let posicionCentral =
            Math.floor(vector.length / 2)

        // Tomar el valor que está exactamente en el centro
        mediana = vector[posicionCentral]

    }else{

        // Si la cantidad de elementos es par
        // Ejemplo:
        // [10,20,30,40]

        // Posición del primer elemento central
        let centro1 =
            vector.length / 2 - 1

        // Posición del segundo elemento central
        let centro2 =
            vector.length / 2

        // Calcular el promedio de ambos valores centrales
        // Ejemplo:
        // (20 + 30) / 2 = 25
        mediana =
            (vector[centro1] + vector[centro2]) / 2
    }

    // Devolver la mediana calculada
    return mediana
}

function calcularModa(){

    // Verificar si el vector está vacío
    if(vector.length == 0){
        resultado.value = "Vector vacío"
        return 0
    }

    let moda = vector[0]
    let mayorFrecuencia = 0

    for(let i = 0; i < vector.length; i++){

        let frecuencia = 0

        for(let j = 0; j < vector.length; j++){

            if(vector[i] == vector[j]){
                frecuencia++
            }
        }

        if(frecuencia > mayorFrecuencia){

            mayorFrecuencia = frecuencia
            moda = vector[i]
        }
    }

    // Si la mayor frecuencia es 1,
    // ningún número se repite
    if(mayorFrecuencia == 1){
        return "No existe moda"
    }

       // Guardar las posiciones donde aparece la moda
    let posiciones = []

    for(let i = 0; i < vector.length; i++){

        if(vector[i] == moda){
            posiciones.push(i)
        }
    }

   return "Moda: " + moda + " (encontrada en posiciones: " + posiciones.join(", ") + ")"
}
