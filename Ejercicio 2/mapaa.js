import fs from "fs";

const leerPackage = async () => {
    try{
        let datos = await fs.promises.readFile("package.json", "utf-8");
        let info = {
            contenidoStr: datos,
            contenidoObj: JSON.parse(datos),
            size: Buffer.byteLength(datos)
        }
        console.log(info);

        fs.promises.writeFile("info", JSON.stringify(info, null, '\t'))
    } catch(error){
        console.log(`Error en la operación asincrónica de escritura/lectura: ${error.message}`);
    }
}

leerPackage();