import fs from "fs";

const leerPackage = () => {
    fs.readFile("package.json", "utf-8", (error, datos) => {
        if (error) throw Error(`Error en la operación asincrónica de lectura: ${error.message}`);

        let info = {
            contenidoStr: datos,
            contenidoObj: JSON.parse(datos),
            size: Buffer.byteLength(datos)
        }
        console.log(info);

        fs.writeFile("info", JSON.stringify(info, null, '\t'), error => {
            if (error) throw Error(`Error en operación asincrónica de escritura: ${error.message}`)
        });
    });
}

leerPackage()