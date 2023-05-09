import fs from "fs";
import { sep } from "path";

const leerArchivoComoString = async (ruta) => {
    try{
        let datos = await fs.promises.readFile(ruta, "utf-8");
        return(datos);
    } catch(error){
        console.log(`Error en la operación asincrónica de lectura: ${error.message}`);
    }
}
//let datos = await leerArchivoComoString("D:/Mati/Ort terciario/Tercer Cuatrimestre/TP2/Ejercicios/Ejercicio 1/archivoEjercicio1.txt");
//console.log(datos);

async function escribirTextoEnArchivo(ruta, texto, flag){
    try{ 
        // Primero guardamos el texto del archivo en una variable para no perderlo:
        let datos = await fs.promises.readFile(ruta, "utf-8");
        // Esto puede dar error si el archivo no existe, lo cual es bueno ya que de esta manera podemos decidir si crear el archivo o no en el catch.

        await fs.promises.writeFile(ruta, datos + texto);
    } catch(error){
        if (flag){
            await fs.promises.writeFile(ruta, texto);
            console.log("El archivo no existía pero se creó!");
        } else{
            console.log("El archivo no existe!");
        }
    }
}
//await escribirTextoEnArchivo("D:/Mati/Ort terciario/Tercer Cuatrimestre/TP2/Ejercicios/Ejercicio 1/archivoEjercicio1Parte2.txt", "Chau!!", true)
//datos = await leerArchivoComoString("D:/Mati/Ort terciario/Tercer Cuatrimestre/TP2/Ejercicios/Ejercicio 1/archivoEjercicio1Parte2.txt");
//console.log(datos);


const transformarStringEnArrayDeNumeros = (texto, separador) => {
    return(texto.split(separador).map(s => Number(s)).filter(s => !isNaN(s)));
}
//console.log(transformarStringEnArrayDeNumeros("123 | 456 | 789 | 1bc | 10", " | "));

function transformarArrayDeNumerosAUnSoloString(array, separador) {
    return array.join(separador);
}
//console.log(transformarArrayDeNumerosAUnSoloString([123, 456, 789, 10], ","));

function combinarDosArrays(array1, array2){    
    return(array1.concat(array2.filter(n => !array1.includes(n))).sort((a, b) => a - b));
}
//console.log(combinarDosArrays([1, 5, 10, 11], [2, 3, 8, 11]));

function combinarNArrays(arrays){
    let arrayFinal = [];
    arrays.forEach(array => arrayFinal = combinarDosArrays(arrayFinal, array));

    return(arrayFinal);
}
//console.log(combinarNArrays([[1, 10], [2, 3, 15, 16], [4], [6,7,13]]));